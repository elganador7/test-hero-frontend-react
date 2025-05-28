import React from "react";
import Login from "../components/auth/Login";

const LoginPage: React.FC<{ returnTo: string }> = ({ returnTo }) => {
  return (
    <div>
      <Login returnTo={returnTo} />
    </div>
  );
};

export default LoginPage;
