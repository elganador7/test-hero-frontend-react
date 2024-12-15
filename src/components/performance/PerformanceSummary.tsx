import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import styles from './PerformanceSummary.module.scss';
import { getUserStats } from '../../services/api';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { UserAnswer } from '../../models/UserAnswer';

interface PerformanceSummary {
  subject_area: string;
  correct_rate: number;
}

const PerformanceSummary: React.FC = () => {
  const [data, setData] = useState<PerformanceSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuthUser()

  useEffect(() => {
    const fetchPerformanceSummary = async () => {
      try {
        const response = await getUserStats(auth.userId);
        setData(response);
        console.log(response);
      } catch (err) {
        setError('Failed to fetch performance summary');
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceSummary();
  }, []);

  if (loading) {
    return (
      <div className={styles.centerWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centerWrapper}>
        <Alert severity="error" className={styles.alert}>
          {error}
        </Alert>
      </div>
    );
  }

  console.log(data);

  return (
    <div className={styles.centerWrapper}>
      <Container maxWidth="md">
        <Box className={styles.container}>
          <Typography variant="h4" className={styles.title}>
            Performance Summary
          </Typography>
          {data && data.length > 0 ? (
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject Area</TableCell>
                    <TableCell align="right">Correct Rate (%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.subject_area}</TableCell>
                      <TableCell align="right">{item.correct_rate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" className={styles.message}>
              No performance data available.
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default PerformanceSummary;
