import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import About from "../pages/about/About";
import Privacy from "../pages/privacy/Privacy";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";


const Router: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [returnTo, setReturnTo] = useState<string>("/");

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative'
      }}>
        <Header setIsDrawerOpen={setIsDrawerOpen} />
        <Box
          component="main"
          sx={{
            marginTop: 9,
            padding: 2,
            flex: '1 0 auto',
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage returnTo={returnTo} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage setReturnTo={setReturnTo} />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route element={
              <AuthOutlet 
                fallbackPath={`/login`}
              />
            }>
              <Route path="/practice" element={<RelevantQuestion />} />
              <Route path="/performance" element={<PerformanceSummary />} />
            </Route>
          </Routes>
        </Box>
        <Footer />
        <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      </Box>
    </BrowserRouter>
  );
};

export default Router;
