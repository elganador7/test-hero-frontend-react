import { Button, Box } from "@mui/material";
import { Question } from "../../models/Question";
import { generateSimilarQuestions } from "../../services/api";
import styles from "./submitOrNext.module.scss";

interface SubmitOrNextProps {
  answeredCorrectly: boolean;
  reset: (data: Question) => void;
  setError: (error: string) => void;
  handleSubmit: () => void;
  loadNewGeneratedQuestion: () => void;
  question: Question;
}

const SubmitOrNext = ({
  answeredCorrectly,
  reset,
  setError,
  question,
  handleSubmit,
  loadNewGeneratedQuestion,
}: SubmitOrNextProps) => {
  const generateNewQuestionFromCurrent = async () => {
    try {
      const data = await generateSimilarQuestions(question?.id);
      reset(data);
    } catch (error) {
      console.error(error);
      setError("Failed to generate a new question");
    }
  };

  return (
    <Box className={styles.actions}>
      {!answeredCorrectly ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Submit Answer
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={loadNewGeneratedQuestion}
        >
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
  );
};

export default SubmitOrNext;
