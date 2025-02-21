import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Alert,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import {
  generateRelevantQuestion,
  generateSimilarQuestions,
  getQuestionAnswer,
  postUserAnswer,
} from "../../services/api";
import { IUserData, Question, TestTopic, UserAnswer } from "../../models/index";
import styles from "./RandomQuestion.module.scss";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import SubmitOrNext from "../../components/questions/SubmitOrNext";
import { useSettingsStore } from "../../store/useSettingsStore";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import TimerIcon from "@mui/icons-material/Timer";
import clsx from "clsx";
import LoadingQuestion from "../../components/common/LoadingQuestion";
import DifficultyIndicator from "../../components/questions/DifficultyIndicator";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax/svg';

const RandomQuestion: React.FC = () => {
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [explanation, setExplanation] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const isAuthenticated = useIsAuthenticated();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuthUser<IUserData>();
  const { filters } = useSettingsStore();

  const reset = (data: Question) => {
    setQuestion(data);
    setTimeLeft(60);
    setOptions(data.options);
    setIsTimerRunning(true);
    setAttempts(0);
    setAnsweredCorrectly(false);
    setSelectedOption(undefined);
    setFeedback("");
    setExplanation("");
  };

  const loadNewGeneratedQuestion = async () => {
    setIsLoading(true);
    if (!isAuthenticated) {
      setError("You must log in first");
      setIsLoading(false);
      return;
    }

    if (filters.subjects.length === 0 || filters.testType === "") {
      setError("Please select a subject and test type");
      setIsLoading(false);
      return;
    }

    try {
      const data = await generateRelevantQuestion(
        auth.userId,
        filters.testType,
        filters.subjects[0] ?? "Math"
      );
      reset(data);
    } catch (error) {
      console.error(error);
      setError("Failed to generate a new question");
    }
    setIsLoading(false);
  };

  const generateNewQuestionFromCurrent = async () => {
    try {
      setQuestion(undefined);
      const data = await generateSimilarQuestions(question?.id);
      reset(data);
    } catch (error) {
      console.error(error);
      setError("Failed to generate a new question");
    }
  };

  useEffect(() => {
    loadNewGeneratedQuestion();
  }, []);

  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFeedback("Time is up!");
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setFeedback("");
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setFeedback("Please select an option");
      return;
    }

    getQuestionAnswer(question?.id || "").then((answer) => {
      setAttempts((prev) => prev + 1);
      if (answer.correct_answer === selectedOption) {
        const user_id = auth.userId || "";
        setFeedback("Correct! Great job!");
        setAnsweredCorrectly(true);
        setIsTimerRunning(false);
        const userAnswer: UserAnswer = {
          id: "",
          user_id: user_id,
          question_id: question?.id || "",
          test_topic_id: question.test_topic.id,
          time_taken: 60 - timeLeft,
          attempts: attempts,
          difficulty: question.difficulty,
        };
        postUserAnswer(userAnswer);
      } else {
        setFeedback("Incorrect. Try again!");
      }
      setExplanation(answer.explanation || "");
    });
  };

  const getTimerClass = () => {
    if (timeLeft <= 10) return styles.danger;
    if (timeLeft <= 30) return styles.warning;
    return "";
  };

  const renderText = (text: string) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeMathjax]}
        components={{
          p: ({ children }) => (
            <Typography
              className={styles.questionText}
              variant="body1"
              gutterBottom
            >
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <ul className={styles.markdownList}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className={styles.markdownList}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className={styles.markdownListItem}>
              {children}
            </li>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  return (
    <Box className={styles.container}>
      {error ? (
        <Box className={styles.errorContainer}>
          <Alert 
            severity="error"
            variant="outlined"
            className={styles.errorAlert}
          >
            {error}
          </Alert>
        </Box>
      ) : !question || isLoading ? (
        <LoadingQuestion />
      ) : (
        <>
          <Typography
            className={styles.title}
            variant="h4"
            color="primary"
            align="center"
            gutterBottom
          >
            {question.test_topic?.test_type || "Math"}:{" "}
            {question.test_topic?.subject || ""}
          </Typography>

          <Box className={clsx(
            styles.panelsContainer, 
            {[styles.singlePanel]: !question.paragraph || question.paragraph === "null"}
          )}>
            {question.paragraph && question.paragraph !== "null" && (
              <Card className={`${styles.card} ${styles.passageCard}`}>
                <CardContent className={styles.cardContent}>
                  <Typography variant="h6" gutterBottom align="center">
                    Reading Passage
                  </Typography>
                  {renderText(question.paragraph)}
                </CardContent>
              </Card>
            )}

            <Card className={`${styles.card} ${styles.questionCard}`}>
              <CardContent sx={{ position: "relative" }}>
                <Typography
                  className={clsx(styles.timer, getTimerClass())}
                  variant="body2"
                  color="textSecondary"
                >
                  <TimerIcon />
                  {timeLeft}s
                </Typography>

                <Typography variant="h6" gutterBottom align="center">
                  {question.test_topic?.subtopic || "Math"}:{" "}
                  {question.test_topic?.specific_topic || ""}
                </Typography>
                {renderText(question.question_text)}

                <FormControl component="fieldset" className={styles.formControl}>
                  <RadioGroup
                    value={selectedOption}
                    onChange={(e) => handleOptionSelect(e.target.value)}
                    className={styles.radioGroup}
                  >
                    {options.map((option, i) => (
                      <FormControlLabel
                        key={i}
                        value={option}
                        control={<Radio />}
                        label={<MathJax>{option}</MathJax>}
                        className={styles.radioOption}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                {feedback && (
                  <Alert
                    className={styles.feedback}
                    severity={answeredCorrectly ? "success" : "warning"}
                    sx={{ mt: 2 }}
                  >
                    {feedback}
                  </Alert>
                )}
                {answeredCorrectly && explanation && (
                  <Box className={styles.explanation}>
                    <Typography variant="h6">Explanation:</Typography>
                    {renderText(explanation)}
                  </Box>
                )}
                {answeredCorrectly && question.difficulty && (
                  <Box className={styles.difficultyContainer}>
                    <DifficultyIndicator difficulty={question.difficulty} />
                  </Box>
                )}
                <SubmitOrNext
                  answeredCorrectly={answeredCorrectly}
                  handleSubmit={handleSubmit}
                  loadNewGeneratedQuestion={loadNewGeneratedQuestion}
                  generateNewQuestionFromCurrent={generateNewQuestionFromCurrent}
                />
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RandomQuestion;
