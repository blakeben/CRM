import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";

const AuthPage = () => {
  return (
    <div>
      <h2>Please sign in</h2>
      <Authenticator />
    </div>
  );
};

export default AuthPage;
