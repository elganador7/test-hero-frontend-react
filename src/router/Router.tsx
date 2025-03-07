import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/header/Header";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/homePage/HomePage";
// import HomePage from "../pages/homePage/HomePage";
import RelevantQuestion from "../pages/questions/RelevantQuestion";
import PerformanceSummary from '../pages/performance/PerformanceSummary';
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { Box } from "@mui/material";
import { Drawer } from "../components/drawer/Drawer";
import { useState } from "react";
//import About from "../pages/about/About";
import Footer from "../components/footer/Footer";

const Router: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      <Box
        sx={{
          marginTop: 9,
          padding: 2,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/practice" element={<RelevantQuestion />} />
            <Route
              path="/performance"
              element={<PerformanceSummary />}
            />
          </Route>
        </Routes>
      </Box>
      <Footer />
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </BrowserRouter>
  );
};

export default Router;
