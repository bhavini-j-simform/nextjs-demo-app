import React,{useState,useEffect} from 'react';
import TaskListTable from './tasks/TaskListTable';
import {getTaskList,deleteTask} from '../api/service';
import { withAuth } from '../context/AuthContext';

const TaskListPage = () => {
 const [tasks, setTasks] = useState([]);
 const [openDialog, setOpenDialog] = useState(false);

 let userId ='';
    if (typeof window !== 'undefined') {
      userId =  localStorage.getItem('userId');
    }
    const fetchData = async () => {
      try {
        const response = await getTaskList(userId);
       console.log('data', response);
        setTasks(response); // Set the fetched data in the state
      } catch (error) {
        console.error('Error fetching task list:', error);
        setTasks([]); // Set empty array if there's an error
      }
    };

  useEffect(() => {
   fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  const deleteSelectedTask=async(taskId)=>{
    try {
      const data = await deleteTask(taskId);
      // Handle successful login, data contains the response from the API
      console.log("delete successful:", data);
      setOpenDialog(false);
      await fetchData();
    } catch (error) {
      // Handle login failure or error
      console.error("Login failed:", error.message);
      alert(error.message);
    }
  }
  return (
    <div>
      <TaskListTable taskList={tasks?.tasks}
       openDialog={openDialog}
       setOpenDialog={setOpenDialog}
        deleteTask={deleteSelectedTask}/>
    </div>
  );
};

export default  withAuth(TaskListPage);