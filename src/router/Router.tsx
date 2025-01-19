import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Header } from "../components/header/Header"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import HomePage from "../pages/homePage/HomePage"
import RandomQuestion from "../pages/questions/RandomQuestion"
import PerformanceSummaryComponent from "../pages/performance/PerformanceSummary"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'


const Router: React.FC = () => {
    return (
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage/>}/>
          <Route element={<AuthOutlet fallbackPath='/login' />}>
            <Route path="/randomQuestion" element={<RandomQuestion />} />
            <Route path="/userPerformance" element={<PerformanceSummaryComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export default Router