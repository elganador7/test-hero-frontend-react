import {
  Box,
  Drawer as MuiDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  QuestionMark, 
  Assessment, 
  InfoRounded,
  Quiz,
  Upgrade
} from "@mui/icons-material";
import styles from "./Drawer.module.scss";
import CheckoutModal from "../checkout/CheckoutButton";
import { useCheckoutModal } from "../../hooks/useCheckoutModal";

export interface DrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Drawer = ({ isDrawerOpen, setIsDrawerOpen }: DrawerProps) => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useCheckoutModal();

  const handleNavigate = (path: string) => {
    setIsDrawerOpen(false);
    navigate(path);
  };

  const menuItems = [
    {
      text: "Practice Questions",
      icon: <Quiz />,
      path: "/practice"
    },
    {
      text: "Performance Summary",
      icon: <Assessment />,
      path: "/performance"
    },
    {
      text: "About",
      icon: <InfoRounded />,
      path: "/about"
    },
  ];

  return (
    <>
      <MuiDrawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: 8,
          }}
        >
          <List>
            <ListItemButton onClick={() => handleNavigate("/")}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => handleNavigate(item.path)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <List>
            <ListItemButton 
              onClick={() => {
                setIsDrawerOpen(false);
                openModal();
              }}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <Upgrade />
              </ListItemIcon>
              <ListItemText 
                primary="Upgrade to Pro" 
                primaryTypographyProps={{
                  fontWeight: 600
                }}
              />
            </ListItemButton>
          </List>
        </Box>
      </MuiDrawer>

      <CheckoutModal open={isOpen} onClose={closeModal} />
    </>
  );
};
