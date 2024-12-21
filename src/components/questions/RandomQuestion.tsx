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
    fetchRandomQuestion,
    generateNewQuestion,
    generateSimilarQuestions,
    getQuestionAnswer,
    postUserAnswer,
} from "../../services/api";
import { Question } from "../../models/Question";
import styles from "./RandomQuestion.module.scss";
import { NewQuestionRequest } from "../../models/NewQuestionRequest";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { UserAnswer } from "../../models/UserAnswer";
import { IUserData } from "../../models/IUserData";

// Utility function to shuffle an array
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
    const [shuffledOptions, setShuffledOptions] = useState<[string, string][]>([]);
    const [error, setError] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);
    const [attempts, setAttempts] = useState<number>(0);
    const [explanation, setExplanation] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
    const isAuthenticated = useIsAuthenticated();
    const auth = useAuthUser<IUserData>()

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
        if (!isAuthenticated) {
            setError("You must log in first");
            return;
        }

        try {
            const data = await generateNewQuestion();
            reset(data);
        } catch {
            setError("Failed to generate a new question");
        }
    };

    const generateNewQuestionFromCurrent = async () => {
        try {
            const data = await generateSimilarQuestions(
                question?.id,
            );
            reset(data);
        } catch {
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
                const userAnswer : UserAnswer = {
                    id: "",
                    user_id: user_id,
                    question_id: question?.id || "", 
                    test_type: question?.test_type || "",
                    subject: question?.subject || "",
                    topic: question?.topic || "",
                    subtopic: question?.subtopic || "",
                    time_taken: (60 - timeLeft),
                    attempts: attempts,
                }
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
            <Typography className={styles.title} variant="h4" color="primary" gutterBottom>
                Math: {question?.topic || ""}
            </Typography>
            {error ? (
                <Alert severity="error">{error}</Alert>
            ) : question ? (
                <Card className={styles.card}>
                    <CardContent>
                        {(question.paragraph && question.paragraph !== "null") ?? (
                            <Typography className={styles.questionText} variant="body1" gutterBottom>
                                {question.paragraph}
                            </Typography>
                        )}
                        <Typography className={styles.questionText} variant="body1" gutterBottom>
                            <MathJax>{question.question_text}</MathJax>
                        </Typography>
                        <Typography className={styles.timer} variant="body2" color="textSecondary">
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
                                <Typography variant="body2"><MathJax>{explanation}</MathJax></Typography>
                            </Box>
                        )}
                        {answeredCorrectly && question.difficulty && (
                            <Box className={styles.explanation}>
                                <Typography variant="h6">{`Difficulty: ${Math.round(question.difficulty * 100)} /100`}</Typography>
                            </Box>
                        )}
                        <Box className={styles.actions}>
                            {!answeredCorrectly ? (
                                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                                    Submit Answer
                                </Button>
                            ) : (
                                <Button variant="contained" color="secondary" fullWidth onClick={loadNewGeneratedQuestion}>
                                    Next Question
                                </Button>
                            )}
                            {answeredCorrectly && (
                                <Button
                                    variant="outlined"
                                    color="info"
                                    fullWidth
                                    className={styles.moreQuestionsButton}
                                    onClick={generateNewQuestionFromCurrent}
                                >
                                    Generate More Like This
                                </Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
};

export default RandomQuestion;
