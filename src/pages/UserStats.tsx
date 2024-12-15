import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './UserStats.module.scss';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface UserStat {
  topic: string;
  questions: number;
  correct: number;
  average_time: number;
}

const UserStats: React.FC = () => {
  const [stats, setStats] = useState<UserStat[]>([]);
  const [error, setError] = useState<string>('');
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser()

  useEffect(() => {
    const fetchStats = async () => {
      if (!isAuthenticated) {
        setError('User is not logged in.');
        return;
      }

      try {
        const response = await fetch(`/api/stats/${auth.userId}`);
        if (!response.ok) throw new Error('Failed to fetch user stats');
        const data: UserStat[] = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      }
    };

    fetchStats();
  }, []);

  const data = {
    labels: stats.map(stat => stat.topic),
    datasets: [
      {
        label: 'Questions Answered',
        data: stats.map(stat => stat.questions),
        backgroundColor: '#4caf50',
      },
      {
        label: 'Correct Answers',
        data: stats.map(stat => stat.correct),
        backgroundColor: '#2196f3',
      },
      {
        label: 'Average Time (s)',
        data: stats.map(stat => stat.average_time),
        backgroundColor: '#ff9800',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Performance by Topic',
      },
    },
  };

  return (
    <div className={styles.container}>
      <h1>User Statistics</h1>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default UserStats;
