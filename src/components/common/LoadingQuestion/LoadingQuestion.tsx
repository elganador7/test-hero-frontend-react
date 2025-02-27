import React from 'react';
import { Box, Skeleton, Card, CardContent } from '@mui/material';
import styles from './LoadingQuestion.module.scss';

const LoadingQuestion: React.FC = () => {
  return (
    <Card className={styles.loadingCard}>
      <CardContent>
        <Box className={styles.container}>
          <Skeleton variant="text" width="60%" height={40} className={styles.title} />
          <Skeleton variant="text" width="100%" height={80} />
          <Box className={styles.options}>
            {[...Array(4)].map((_, i) => (
              <Skeleton 
                key={i} 
                variant="rectangular" 
                height={56} 
                className={styles.option}
              />
            ))}
          </Box>
          <Box className={styles.footer}>
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoadingQuestion; 