import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { loginUser } from "../api/service";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData?.email, formData?.password);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userId", data.user._id);
      router.push("/AddTaskPage");
      setLoading(false);
    } catch (error) {
      // Handle login failure or error
      console.error("Login failed:", error.message);
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
            {/* Add other form fields as needed */}

            <Button variant="contained" color="primary" type="submit">
              {loading ? <CircularProgress size={20} /> : " Login"}
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
