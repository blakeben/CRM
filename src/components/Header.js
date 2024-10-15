import { signOut } from "@aws-amplify/auth";
import React from "react";

const Header = ({ user }) => {
  const handleSignOut = async () => {
    try {
      await signOut({ global: true });
      window.location.href = "/auth";
    } catch (error) {
      console.error("Error signing out:", error);
      alert("There was an issue signing you out. Please try again.");
    }
  };

  return (
    <header>
      <p>Welcome, {user?.username}</p>
      <button onClick={handleSignOut}>Sign out</button>
    </header>
  );
};

export default Header;
