import React from 'react';
import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

type LocationState = {
  state: {
    subscription: string;
  };
};

const Cancel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as LocationState;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await fetch('api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId: location.state.subscription,
      }),
    });

    navigate('/account', { replace: true });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Cancel
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Cancel Subscription
      </Button>
    </Box>
  );
};

export default Cancel;
