import {
  Box,
  Drawer as MuiDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Settings, ArrowForward, Home, Report } from "@mui/icons-material";

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
            <ListItemButton onClick={() => handleNavigate("/randomQuestion")}>
              <ListItemIcon>
                <ArrowForward />
              </ListItemIcon>
              <ListItemText primary="Practice Now" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate("/userPerformance")}>
              <ListItemIcon>
                <Report />
              </ListItemIcon>
              <ListItemText primary="Your Performance" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate("/testTopicSettings")}>
              <ListItemIcon>
                <Report />
              </ListItemIcon>
              <ListItemText primary="Select Tests" />
            </ListItemButton>
            <ListItemButton onClick={() => setIsCheckoutFormModalOpen(true)}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Your Account" />
            </ListItemButton>
          </List>
        </Box>
      </MuiDrawer>
    </>
  );
};
