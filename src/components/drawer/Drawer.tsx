import {
  Box,
  Drawer as MuiDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { 
  Home, 
  QuestionMark, 
  Assessment, 
  InfoRounded,
  Quiz,
  ContactPage
} from "@mui/icons-material";
import styles from "./Drawer.module.scss";

export interface DrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheckoutFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Drawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  setIsCheckoutFormModalOpen,
}: DrawerProps) => {
  const navigate = useNavigate();
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
      {/* Drawer */}
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
        </Box>
      </MuiDrawer>
    </>
  );
};
