import React from "react";
import Sidebar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <div className=" text-white">
          {children}
      </div>
    </div>
  );
};

export default Layout;