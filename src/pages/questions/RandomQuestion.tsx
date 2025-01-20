import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { IUserData, Question, UserAnswer } from "../../models/index";
import styles from "./RandomQuestion.module.scss";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import SubmitOrNext from "../../components/questions/SubmitOrNext";

// Utility function to shufflex an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const RandomQuestion: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<[string, string][]>(
    []
  );
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

  const reset = (data: Question) => {
    setQuestion(data);
    setTimeLeft(60);

    // Shuffle options when question is loaded
    const shuffled = shuffleArray(Object.entries(data.options));
    setShuffledOptions(shuffled);

    setIsTimerRunning(true);
    setAttempts(0);
    setAnsweredCorrectly(false);
    setSelectedOption(null);
    setFeedback("");
    setExplanation("");
  };

  // const loadRandomQuestion = async () => {
  //     try {
  //         const data = await fetchRandomQuestion();
  //         reset(data);
  //     } catch {
  //         setError("Failed to load a random question");
  //     }
  // };

  const loadNewGeneratedQuestion = async () => {
    setIsLoading(true);
    if (!isAuthenticated) {
      setError("You must log in first");
      setIsLoading(false);
      return;
    }

    try {
      const data = await generateRelevantQuestion("ACT", "Math", auth.userId);
      reset(data);
    } catch (error) {
      console.error(error);
      setError("Failed to generate a new question");
    }
    setIsLoading(false);
  };

  const generateNewQuestionFromCurrent = async () => {
    try {
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

    setAttempts((prev) => prev + 1);
  };

  return (
    <Box className={styles.container}>
      {!isLoading && (
        <Typography
          className={styles.title}
          variant="h4"
          color="primary"
          align="center"
          gutterBottom
        >
          {question?.test_topic?.subtopic || "Math"}:{" "}
          {question?.test_topic?.specific_topic || ""}
        </Typography>
      )}
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : question && !isLoading ? (
        <Card className={styles.card}>
          <CardContent>
            {(question.paragraph && question.paragraph !== "null") ?? (
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
            <Typography
              className={styles.timer}
              variant="body2"
              color="textSecondary"
            >
              Time Left: {timeLeft}s
            </Typography>
            <FormControl component="fieldset" className={styles.formControl}>
              <RadioGroup
                value={selectedOption}
                onChange={(e) => handleOptionSelect(e.target.value)}
              >
                {shuffledOptions.map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio />}
                    label={<MathJax>{value}</MathJax>}
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
              <Box className={styles.explanation}>
                <Typography variant="h6">{`Difficulty: ${Math.round(
                  question.difficulty * 100
                )} /100`}</Typography>
              </Box>
            )}
            <SubmitOrNext
              answeredCorrectly={answeredCorrectly}
              reset={reset}
              setError={setError}
              question={question}
              handleSubmit={handleSubmit}
              loadNewGeneratedQuestion={loadNewGeneratedQuestion}
            />
          </CardContent>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default RandomQuestion;
