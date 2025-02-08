import { Button, Box } from "@mui/material";
import { Question } from "../../models/Question";
import styles from "./submitOrNext.module.scss";

interface SubmitOrNextProps {
  answeredCorrectly: boolean;
  handleSubmit: () => void;
  loadNewGeneratedQuestion: () => void;
  generateNewQuestionFromCurrent: () => void;
}

const SubmitOrNext = ({
  answeredCorrectly,
  handleSubmit,
  loadNewGeneratedQuestion,
  generateNewQuestionFromCurrent,
}: SubmitOrNextProps) => {
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
