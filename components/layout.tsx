import React from "react";
import NavBar from "./navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
