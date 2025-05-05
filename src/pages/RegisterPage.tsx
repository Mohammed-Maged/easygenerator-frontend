import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { register as registerApi } from "../api/auth";
import type { RegisterData } from "../types/auth";
import { registerValidationSchema } from "../validations/registerValidation";
import toast from "react-hot-toast";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    setLoading(true);
    try {
      await registerApi(data);
      toast.success("Account created! Please login.");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width="100%"
          mt={2}
        >
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            slotProps={{ input: { style: { textTransform: "capitalize" } } }}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            slotProps={{ input: { style: { textTransform: "capitalize" } } }}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            autoComplete="email"
            inputMode="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {errors.root?.message && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.root.message}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
        <Box position="absolute" top={16} right={16}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Button variant="outlined" onClick={() => navigate("/")}>
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
