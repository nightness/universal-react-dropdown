// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import GlobalProvider from "./providers/GlobalProvider.tsx";

// styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { CSSVarsProvider } from "@providers/CssVarsProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CSSVarsProvider defaultVars={{
          "--test-color": "#0b1c33"
        }}>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </CSSVarsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
