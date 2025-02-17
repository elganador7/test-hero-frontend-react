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

  return (
    <Box className={styles.container}>
      {error ? (
        <Alert severity="error">{error}</Alert>
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
            {question.test_topic?.subtopic || "Math"}:{" "}
            {question.test_topic?.specific_topic || ""}
          </Typography>
          <Card className={styles.card}>
            <CardContent sx={{ position: "relative" }}>
              <Typography
                className={clsx(styles.timer, getTimerClass())}
                variant="body2"
                color="textSecondary"
              >
                <TimerIcon />
                {timeLeft}s
              </Typography>
              {question.paragraph && question.paragraph !== "null" && (
                <Typography
                  className={styles.questionText}
                  variant="body1"
                  gutterBottom
                >
                  {question.paragraph}
                </Typography>
              )}
              <Typography
                className={styles.questionText}
                variant="body1"
                gutterBottom
              >
                <MathJax>{question.question_text}</MathJax>
              </Typography>
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
                  <Typography variant="body2">
                    <MathJax>{explanation}</MathJax>
                  </Typography>
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
        </>
      )}
    </Box>
  );
};

export default RandomQuestion;
