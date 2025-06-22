import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Divider, CircularProgress } from '@mui/material';

type Subscription = {
  id: string;
  status: string;
  default_payment_method?: {
    card?: {
      last4: string;
    };
  };
  current_period_end: number;
};

type SubscriptionsResponse = {
  subscriptions: {
    data: Subscription[];
  };
};

const AccountSubscription: React.FC<{ subscription: Subscription }> = ({ subscription }) => {
  return (
    <Box mb={3}>
      <Divider />
      <Typography variant="h6" component="h4" gutterBottom>
        <a href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`} target="_blank" rel="noopener noreferrer">
          {subscription.id}
        </a>
      </Typography>

      <Typography variant="body1">Status: {subscription.status}</Typography>
      <Typography variant="body1">
        Card last4: {subscription.default_payment_method?.card?.last4 || 'N/A'}
      </Typography>
      <Typography variant="body1">
        Current period end: {new Date(subscription.current_period_end * 1000).toLocaleString()}
      </Typography>

      <Button 
        component={Link} 
        to="/cancel" 
        state={{ subscription: subscription.id }} 
        variant="contained" 
        color="secondary"
        sx={{ mt: 2 }}
      >
        Cancel Subscription
      </Button>
    </Box>
  );
};

const Account: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('api/subscriptions');
      const data: SubscriptionsResponse = await response.json();
      setSubscriptions(data.subscriptions.data);
    };
    fetchData();
  }, []);

  if (!subscriptions) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Account
      </Typography>

      <Box mb={3}>
        <Button href="/prices" variant="outlined" color="primary" sx={{ mr: 2 }}>
          Add a Subscription
        </Button>
        <Button href="/" variant="outlined" color="secondary">
          Restart Demo
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Subscriptions
      </Typography>

      <Box id="subscriptions">
        {subscriptions.map((subscription) => (
          <AccountSubscription key={subscription.id} subscription={subscription} />
        ))}
      </Box>
    </Box>
  );
};

export default Account;
