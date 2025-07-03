import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import ActivePageProvider from "./studentDash/contexts/ActivePageContext";
import TeacherActivePageProvider from "./teacherDash/contexts/TeacherActivePageContext";
import ManageActivePageProvider from "./manageDash/contexts/ManageActivePageContext";
import VendorActivePageProvider from "./vendorDashboard/contexts/VendorActivePageContext";
import AdminActivePageProvider from "./adminDash/contexts/AdminActivePageContext";
import { Toaster } from "sonner";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AdminActivePageProvider>
          <VendorActivePageProvider>
            <ManageActivePageProvider>
              <TeacherActivePageProvider>
                <ActivePageProvider>
                  <Toaster position="top-right" richColors closeButton />

                  <App />
                </ActivePageProvider>
              </TeacherActivePageProvider>
            </ManageActivePageProvider>
          </VendorActivePageProvider>
        </AdminActivePageProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
