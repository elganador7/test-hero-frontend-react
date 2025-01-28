import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
// import { loadStripe } from "@stripe/stripe-js";
import BuyButtonArray from "./BuyButtonArray";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm"
// const stripePromise = loadStripe("pk_test_YOUR_PUBLISHABLE_KEY");

interface CheckoutFormModalProps {
  setIsCheckoutFormModalOpen: (isOpen: boolean) => void;
  isCheckoutFormModalOpen: boolean;
}

const CheckoutFormModal = ({ setIsCheckoutFormModalOpen, isCheckoutFormModalOpen }: CheckoutFormModalProps) => {
  const handleClose = () => setIsCheckoutFormModalOpen(false);

  return (
    <div>
      <Dialog open={isCheckoutFormModalOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Payment</DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
            <BuyButtonArray />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckoutFormModal;
