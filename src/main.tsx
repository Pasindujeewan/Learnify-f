import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastProvider } from "./context/ToastProvider.tsx";

import { MainRouter } from "./router/MainRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <MainRouter />
    </ToastProvider>
  </StrictMode>,
);
