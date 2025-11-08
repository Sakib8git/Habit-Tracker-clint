import { createBrowserRouter } from "react-router";
import Root from "../Main/Root";
import Home from "../Pages/Home/Home";
import AddHabit from "../Pages/AddHabit/AddHabit";
import MyHabits from "../Pages/MyHabits/MyHabits";
import BrowseHabits from "../Pages/BrowseHabits/BrowseHabits";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "add-habit",
        element: <AddHabit></AddHabit>,
      },
      {
        path: "my-habits",
        element: <MyHabits></MyHabits>,
      },
      {
        path: "browse",
        Component: BrowseHabits,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
