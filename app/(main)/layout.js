import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <div className="container mx-auto my-32">{children}</div>
    </div>
  );
};

export default layout;
