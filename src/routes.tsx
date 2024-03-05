import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Root from "./components/Root";
import ChooseYourProject from "./pages/ChooseYourProject";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SwitchingFossilFuelsPurpose from "./pages/SwitchingFossilFuelsPurpose";
import ProjectsPage from "./pages/projects/ProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      { path: "profile", element: <div>Profile</div> },
      { path: "contact", element: <div>Contact</div> },
      {
        path: "projects",
        element: (
          <RequireAuth>
            <ProjectsPage />
          </RequireAuth>
        ),
      },
      {
        path: "projects/switching-fossil-fuels",
        element: (
          <RequireAuth>
            <SwitchingFossilFuelsPurpose />
          </RequireAuth>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "/", element: <ChooseYourProject /> },
    ],
  },
]);
