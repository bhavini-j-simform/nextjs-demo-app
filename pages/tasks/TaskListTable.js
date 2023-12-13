import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useRouter } from "next/router";

const TaskListTable = ({ taskList,openDialog,setOpenDialog,deleteTask}) => {
  const router = useRouter();
const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleEdit = (taskId) => {
    // Find the task data based on the taskId
    const selectedTask = taskList?.find((task) => task._id === taskId);

    // Redirect to the add task form page with pre-filled data
    router.push({
      pathname: "/AddTaskPage", // Replace with your add task form page path
      query: selectedTask, // Pass the selected task as query parameters
    });
  };

  const handleDeleteClick = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    // Handle delete action with selectedTaskId
    deleteTask(selectedTaskId)
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
    setSelectedTaskId(null);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList?.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(task._id)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(task._id, task.taskName)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {taskList?.length <=0 &&
            <div>
              <h2>
                No data available
                </h2></div>}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmationModal
        open={openDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        taskName={
          taskList?.find((task) => task._id === selectedTaskId)?.taskName || ""
        }
      />
    </Box>
  );
};

export default TaskListTable;
