import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  useTheme,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeStore } from "../../App";
import { useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-buy-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "buy-button-id": string;
          "publishable-key": string;
        },
        HTMLElement
      >;
    }
  }
}

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const pricingPlans = [
  {
    title: "Monthly Plan",
    price: "$9.99",
    period: "month",
    buyButtonId: "buy_btn_1QjP5SAL4Wig1Koweya8w0xm",
    features: [
      "Unlimited practice questions",
      "Personalized feedback",
      "Performance analytics",
      "7-day free trial",
    ],
  },
  {
    title: "Quarterly Plan",
    price: "$24.99",
    period: "3 months",
    buyButtonId: "buy_btn_1QjW5nAL4Wig1KowUNhx6req",
    features: [
      "All Monthly Plan features",
      "Save 17% compared to monthly",
      "Priority support",
      "7-day free trial",
    ],
  },
];

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { mode } = useThemeStore();
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h4" component="div" color="primary">
          Choose Your Plan
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[4],
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <stripe-buy-button
              buy-button-id="buy_btn_1QjW69AL4Wig1KowlxOcCuwp"
              publishable-key="pk_live_51QdZqlAL4Wig1Kow4pYOeL8fe14CioHTbV2tc8knOWlq2kMLWhuu5auyK2gzhaLXxILLhogAwL5mqmwugtpTEQR500Ui49x6oE"
            ></stripe-buy-button>
            <stripe-buy-button
              buy-button-id="buy_btn_1QjP5SAL4Wig1Koweya8w0xm"
              publishable-key="pk_live_51QdZqlAL4Wig1Kow4pYOeL8fe14CioHTbV2tc8knOWlq2kMLWhuu5auyK2gzhaLXxILLhogAwL5mqmwugtpTEQR500Ui49x6oE"
            ></stripe-buy-button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          All plans include a 7-day free trial. Cancel anytime.
        </Typography>
      </DialogActions>
    </Dialog>
  );
}
