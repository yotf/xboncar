import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Root from "./components/Root";
import DashboardPage from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ProvidingElectricityBaseline from "./pages/baselineEstimation/providingElectricityToTheGrid/ProvidingElectricityBaseline";
import AboutYourProject from "./pages/projectCreation/AboutYourProject";
import ChooseYourProject from "./pages/projectCreation/ChooseYourProject";
import SwitchingFossilFuelsPurpose from "./pages/projectCreation/SwitchingFossilFuelsPurpose";
import ProjectsPage from "./pages/projects/ProjectsPage";
import TimelinePage from "./pages/timeline/TimeLinePage";
import ProvidingElectricityProjectEstimation from "./pages/baselineEstimation/providingElectricityToTheGrid/ProvidingElectricityProjectEstimation";

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
      {
        path: "projects/switching-fossil-fuels/:project-purpose",
        element: (
          <RequireAuth>
            <AboutYourProject />
          </RequireAuth>
        ),
      },
      { path: "projects/:id/dashboard", element: <DashboardPage /> },
      { path: "projects/:id/dashboard/timeline", element: <TimelinePage /> },
      {
        path: "projects/:id/dashboard/baseline-estimate",
        element: <ProvidingElectricityBaseline />,
      },
      {
        path: "projects/:id/dashboard/project-estimate",
        element: <ProvidingElectricityProjectEstimation/>,
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "/", element: <ChooseYourProject /> },
    ],
  },
]);
