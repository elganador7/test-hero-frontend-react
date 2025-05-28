import React from 'react';
import { Box, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from './SubmitOrNext.module.scss';

interface SubmitOrNextProps {
  answeredCorrectly: boolean;
  handleSubmit: () => void;
  loadNewGeneratedQuestion: () => void;
  generateNewQuestionFromCurrent: () => void;
}

const SubmitOrNext: React.FC<SubmitOrNextProps> = ({
  answeredCorrectly,
  handleSubmit,
  loadNewGeneratedQuestion,
  generateNewQuestionFromCurrent,
}) => {
  return (
    <Box className={styles.container}>
      {!answeredCorrectly ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<CheckCircleOutlineIcon />}
          className={styles.button}
        >
          Submit Answer
        </Button>
      ) : (
        <Box className={styles.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            onClick={loadNewGeneratedQuestion}
            startIcon={<NavigateNextIcon />}
            className={styles.button}
          >
            Next Question
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={generateNewQuestionFromCurrent}
            startIcon={<RefreshIcon />}
            className={styles.button}
          >
            Similar Question
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SubmitOrNext;
