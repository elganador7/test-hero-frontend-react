import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';

type Price = {
  id: string;
  product: {
    name: string;
  };
  unit_amount: number;
};

type PricesResponse = {
  prices: Price[];
};

type CreateSubscriptionResponse = {
  subscriptionId: string;
  clientSecret: string;
};

const Prices: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await fetch('api/config');
      const data: PricesResponse = await response.json();
      setPrices(data.prices);
    };
    fetchPrices();
  }, []);

  const createSubscription = async (priceId: string) => {
    const response = await fetch('api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });
    const data: CreateSubscriptionResponse = await response.json();

    navigate('/subscribe', {
      state: {
        from: location,
        subscriptionId: data.subscriptionId,
        clientSecret: data.clientSecret,
      },
      replace: false,
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Select a Plan
      </Typography>

      <Grid container spacing={3}>
        {prices.map((price) => (
          <Grid item xs={12} sm={6} md={4} key={price.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {price.product.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  ${price.unit_amount / 100} / month
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => createSubscription(price.id)}
                  >
                    Select
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Prices;
