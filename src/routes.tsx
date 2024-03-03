import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  { path: "/", errorElement: <ErrorPage />, element: <Root /> },
]);
