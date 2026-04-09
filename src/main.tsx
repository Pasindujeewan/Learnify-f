import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastProvider } from "./context/ToastProvider.tsx";
import { Provider } from "react-redux";
import { MainRouter } from "./router/MainRouter.tsx";
import store from "./app/store.ts";
import { ThemeProvider } from "./context/ThemeContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <ToastProvider>
          <MainRouter />
        </ToastProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
