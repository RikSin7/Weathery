import Dashboard from "../pages/Dashboard";
import Historical from "../pages/Historical";
import RootLayout from "../layout/RootLayout";
import NotFound from "../pages/NotFound";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "history",
        element: <Historical />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];