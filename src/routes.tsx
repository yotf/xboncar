import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Root from "./components/Root";
import ContactPage from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import DashboardPage from "./pages/dashboard/Dashboard";
import ExistingFacilityBaseline from "./pages/estimation/ExistingFacilityBaselinePage";
import GreenFieldBaseline from "./pages/estimation/GreenFieldBaselinePage";
import ProjectEstimation from "./pages/estimation/ProjectEstimation";
import ProvidingElectricityBaseline from "./pages/estimation/ProvidingElectricityBaseline";
import AboutYourProject from "./pages/projectCreation/AboutYourProject";
import ChooseYourProject from "./pages/projectCreation/ChooseYourProject";
import SwitchingFossilFuelsPurpose from "./pages/projectCreation/SwitchingFossilFuelsPurpose";
import ProjectsPage from "./pages/projects/ProjectsPage";
import TimelinePage from "./pages/timeline/TimeLinePage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      { path: "profile", element: <ProfilePage /> },
      { path: "contact", element: <ContactPage /> },
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
      { path: "projects/:projectId/dashboard", element: <DashboardPage /> },
      {
        path: "projects/:projectId/dashboard/timeline",
        element: <TimelinePage />,
      },
      {
        path: "projects/:projectId/dashboard/baseline-estimate/electricity-grid",
        element: <ProvidingElectricityBaseline />,
      },
      {
        path: "projects/:projectId/dashboard/project-estimate/electricity-grid",
        element: <ProjectEstimation />,
      },
      {
        path: "projects/:projectId/dashboard/baseline-estimate/captive-energy",
        element: <ExistingFacilityBaseline />,
      },
      {
        path: "projects/:projectId/dashboard/project-estimate/captive-energy",
        element: <ProjectEstimation />,
      },
      {
        path: "projects/:projectId/dashboard/baseline-estimate/greenfield-expansion",
        element: <GreenFieldBaseline />,
      },
      {
        path: "projects/:projectId/dashboard/project-estimate/greenfield-expansion",
        element: <ProjectEstimation />,
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "/", element: <ChooseYourProject /> },
    ],
  },
]);
