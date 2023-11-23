import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import PrizePage from "./pages/PrizePage.tsx";
import LanguageContextProvider from "./contexts/LanguageContextProvider.tsx";
import DataContextProvider from "./contexts/DataContextProvider.tsx";
import SortContextProvider from "./contexts/SortContextProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/nagrody/:paramLang/:paramYear",
        

    element: <PrizePage />
,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageContextProvider>
      <DataContextProvider>
        <RouterProvider router={router} />
      </DataContextProvider>
    </LanguageContextProvider>
  </React.StrictMode>
);
