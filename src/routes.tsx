import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      { path: "profile", element: <div>Profile</div> },
      { path: "contact", element: <div>Contact</div> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);
