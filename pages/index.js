import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { signupUser } from "../api/service";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/AddTaskPage");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await signupUser(formData);
      setTimeout(() => {
        setLoading(false);
        console.log("Signup successful:", data);
        router.push("/login");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("signup failed:", error.message);
      alert(error.message);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Already have an account? Login here
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLoginRedirect}
          >
            Login
          </Button>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button variant="contained" color="primary" type="submit">
              {loading ? <CircularProgress size={20} /> : " Sign Up"}
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
