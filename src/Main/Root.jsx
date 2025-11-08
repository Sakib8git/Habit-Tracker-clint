import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/NavBar/NavBar";

const Root = () => {
  return (
    <div className="container mx-auto">
      <header>
        <NavBar></NavBar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </div>
  );
};

export default Root;
