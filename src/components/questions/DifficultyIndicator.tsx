import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import styles from './DifficultyIndicator.module.scss';
import clsx from 'clsx';

interface DifficultyIndicatorProps {
  difficulty: number;
  showLabel?: boolean;
}

const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({ 
  difficulty, 
  showLabel = true 
}) => {
  const getDifficultyColor = (value: number) => {
    if (value < 0.4) return styles.easy;
    if (value < 0.7) return styles.medium;
    return styles.hard;
  };

  const getDifficultyLabel = (value: number) => {
    if (value < 0.4) return 'Easy';
    if (value < 0.7) return 'Medium';
    return 'Hard';
  };

  return (
    <Box className={styles.container}>
      {showLabel && (
        <Typography variant="subtitle2" color="textSecondary">
          Difficulty:
        </Typography>
      )}
      <Tooltip title={`${Math.round(difficulty * 100)}/100`}>
        <Box className={styles.indicator}>
          <Box 
            className={clsx(styles.bar, getDifficultyColor(difficulty))}
            sx={{ width: `${difficulty * 100}%` }}
          />
          <Typography variant="caption" className={styles.label}>
            {getDifficultyLabel(difficulty)}
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default DifficultyIndicator; 