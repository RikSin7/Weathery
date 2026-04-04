import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryProvider } from "./providers/QueryProvider";
import { UnitProvider } from "./providers/UnitProvider";

function App() {
  return (
    <QueryProvider>
      <UnitProvider>
        <RouterProvider router={router} />
      </UnitProvider>
    </QueryProvider>
  )
}

export default App