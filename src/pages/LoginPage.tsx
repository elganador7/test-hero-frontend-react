import React from "react";
import Login from "../components/auth/Login";
import { useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const location = useLocation();
  const returnTo = new URLSearchParams(location.search).get('returnTo') || '/';

  return (
    <div>
      <Login returnTo={returnTo} />
    </div>
  );
};

export default LoginPage;
