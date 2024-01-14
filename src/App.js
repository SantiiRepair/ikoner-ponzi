import React from "react";
import { RouterProvider } from "react-router-dom/dist";

import { router } from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
