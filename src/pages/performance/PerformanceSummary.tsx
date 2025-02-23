import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import styles from "./PerformanceSummary.module.scss";
import { getUserStats } from "../../services/api";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { UserPerformanceSummary, IUserData } from "../../models/index";

const PerformanceSummaryComponent: React.FC = () => {
  const [data, setData] = useState<UserPerformanceSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuthUser<IUserData>();

  useEffect(() => {
    const fetchPerformanceSummary = async () => {
      try {
        const response = await getUserStats(auth.userId);
        setData(response);
      } catch (err) {
        setError("Failed to fetch performance summary");
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

  return (
    <Box className={styles.container}>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        gutterBottom
        className={styles.title}
      >
        Performance Summary
      </Typography>

      <Card className={styles.card}>
        <CardContent>
          {data && data.length > 0 ? (
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Test Type</TableCell>
                    <TableCell>Topic</TableCell>
                    <TableCell>Subtopic</TableCell>
                    <TableCell>Specific Topic</TableCell>
                    <TableCell align="right">Correct Rate (%)</TableCell>
                    <TableCell align="right">Total Points</TableCell>
                    <TableCell align="right">Total Points Possible</TableCell>
                    <TableCell align="right">Difficulty Rating</TableCell>
                    <TableCell align="right">Weighting Formula Value</TableCell>
                    <TableCell align="right">Scored Question Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.testType}</TableCell>
                      <TableCell>{item.topic}</TableCell>
                      <TableCell>{item.subtopic}</TableCell>
                      <TableCell>{item.specific_topic}</TableCell>
                      <TableCell align="right">
                        {(item.correct_rate * 100).toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {item.total_points.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {item.total_points_possible.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          item.total_points / item.total_points_possible
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (item.total_points * item.total_points) /
                          item.total_points_possible
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{item.question_count}</TableCell>
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default PerformanceSummaryComponent;
