import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { addTask, updateTask } from "../../api/service";
import CircularProgress from "@mui/material/CircularProgress";

const AddTaskForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    taskName: "",
    description: "",
    status: "Pending",
  });
  const [pageTitle, setPageTitle] = useState("Add Task");

  useEffect(() => {
    // Get the task data from query parameters when the component mounts
    const { taskName, description, status } = router.query;

    if (taskName && description && status) {
      setPageTitle("Edit Task"); // Set the title to 'Edit Task' if query parameters exist
      // Set the task data in the state to pre-fill the form fields
      setTaskData({
        taskName: taskName || "",
        description: description || "",
        status: status || "",
      });
    }
  }, [router.query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { _id } = router.query;
    if (_id) {
      try {
        await updateTask({
          taskId: _id,
          taskName: taskData.taskName,
          description: taskData.description,
          status: taskData.status,
        });
        router.push("/TaskListPage");
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    } else {
      try {
        await addTask({
          userId: localStorage.getItem("userId"),
          taskName: taskData.taskName,
          description: taskData.description,
          status: taskData.status,
        });
        router.push("/TaskListPage");
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {pageTitle}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Task Name"
            name="taskName"
            value={taskData.taskName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Task Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="taskStatusLabel">Task Status</InputLabel>
            <Select
              labelId="taskStatusLabel"
              id="taskStatus"
              name="status"
              value={taskData.status}
              onChange={handleChange}
              label="Task Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" type="submit">
            {loading ? <CircularProgress size={20} /> : pageTitle}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddTaskForm;
