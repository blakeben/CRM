import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AddClient from "./components/AddClient";
import EditClient from "./components/EditClient";
import AuthPage from "./components/AuthPage";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsConfig from "./aws-exports";

Amplify.configure(awsConfig);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="*"
          element={
            <Authenticator>
              {({ signOut, user }) =>
                user ? (
                  <>
                    <Header user={user} signOut={signOut} />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/add-client" element={<AddClient />} />
                      <Route
                        path="/edit-client/:clientId"
                        element={<EditClient />}
                      />
                      <Route path="*" element={<Navigate to="/" />} />{" "}
                    </Routes>
                  </>
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            </Authenticator>
          }
        />
      </Routes>
    </Router>
  );
}
