import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { logout as logoutApi } from "../api/auth";
import toast from "react-hot-toast";

const DashboardPage: React.FC = () => {
  const { user, tokens, setUser, setTokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens?.accessToken) {
      navigate("/");
    }
  }, [tokens, navigate]);

  const handleLogout = async () => {
    try {
      await logoutApi();
      toast.success("Logged out successfully!");
    } catch {
      toast.error("Logout failed!");
    } finally {
      setUser(null);
      setTokens(null);
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <Box p={4} >
      <Typography variant="h4" gutterBottom>
        Welcome to the application, {user?.firstName} {user?.lastName}
      </Typography>
      <Typography variant="subtitle1">Email: {user?.email}</Typography>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleLogout}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default DashboardPage;
