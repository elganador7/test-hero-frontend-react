import React, { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useStripe, useElements, CardElement, EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

function getStripe(): Promise<Stripe | null> {
  if (!stripePromise)
    stripePromise = loadStripe(
      "pk_test_51QdZqlAL4Wig1KowaDAcVSJlfSRrzBZ0bP1Gm02VnqRpOQAMHBt12l68nshSiJyw9KARSIARrxhM1KhBQ6XXbPhQ00PBi0mMAt" as string,
    );

  return stripePromise;
}

const plans = [
  { id: "90_day", label: "90-Day Membership ($9.99)", amount: 999 },
  { id: "30_day", label: "30-Day Membership ($3.99)", amount: 399 },
  { id: "annual", label: "Annual Membership ($34.99)", amount: 3499 },
];

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[0].id);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan) {
      setError("Invalid plan selected.");
      return;
    }

    const res = await fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: plan.amount, currency: "usd" }),
    });

    const { clientSecret } = await res.json();

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (paymentResult.error) {
      setError(paymentResult.error.message || "Payment failed");
    } else {
      setError(null);
      setSuccess(true);
    }
  };

  return (
    <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
        <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  //   <form onSubmit={handleSubmit}>
      
  //     <Typography variant="h6" gutterBottom>
  //       Choose Your Plan
  //     </Typography>

  //     <FormControl fullWidth margin="normal">
  //       <InputLabel id="plan-select-label">Membership Plan</InputLabel>
  //       <Select
  //         labelId="plan-select-label"
  //         value={selectedPlan}
  //         onChange={(e) => setSelectedPlan(e.target.value)}
  //       >
  //         {plans.map((plan) => (
  //           <MenuItem key={plan.id} value={plan.id}>
  //             {plan.label}
  //           </MenuItem>
  //         ))}
  //       </Select>
  //     </FormControl>

  //     <Box mt={2}>
  //       <CardElement
  //         options={{
  //           style: {
  //             base: {
  //               fontSize: "16px",
  //               color: "#424770",
  //               "::placeholder": {
  //                 color: "#aab7c4",
  //               },
  //             },
  //             invalid: {
  //               color: "#9e2146",
  //             },
  //           },
  //         }}
  //       />
  //     </Box>

  //     <Button
  //       type="submit"
  //       variant="contained"
  //       color="primary"
  //       disabled={!stripe}
  //       fullWidth
  //       sx={{ mt: 2 }}
  //     >
  //       Pay ${plans.find((plan) => plan.id === selectedPlan)?.amount / 100}
  //     </Button>

  //     {error && (
  //       <Box mt={2} color="error.main">
  //         {error}
  //       </Box>
  //     )}
  //     {success && (
  //       <Box mt={2} color="success.main">
  //         Payment Successful!
  //       </Box>
  //     )}

  //     {/* Add the "Powered by Stripe" badge */}
  //     <Box mt={4} textAlign="center">
  //       <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
  //         <img
  //           src="https://stripe.com/img/v3/newsroom/social.png"
  //           alt="Powered by Stripe"
  //           style={{ width: "150px" }}
  //         />
  //       </a>
  //     </Box>
  //   </form>
  );
};

export default CheckoutForm;
