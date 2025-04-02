import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111828]">
      {children}
    </div>
  );
};

export default AuthLayout;
