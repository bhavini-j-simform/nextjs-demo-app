import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';


const Header = () => {
  const router = useRouter();
  let isAuthenticated =false;
  if (typeof window !== 'undefined') {
    isAuthenticated =  localStorage?.getItem('isLoggedIn');
  }
 
  const handleLogout = () => {
     localStorage.clear();
    router.push('/login');
  };

  return (<>
  {isAuthenticated &&
   <AppBar position="static">
   <Toolbar>
     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Simple Task Status Management Application
     </Typography>
     <Box sx={{ display: 'flex', alignItems: 'center' }}>
       <Link href="/AddTaskPage" passHref>
         <Button color="inherit" component="a">
           Add Task
         </Button>
       </Link>
       <Link href="/TaskListPage" passHref>
         <Button color="inherit" component="a">
           Task List
         </Button>
       </Link>
       <Button color="inherit" onClick={handleLogout}>
         Logout
       </Button>
     </Box>
   </Toolbar>
 </AppBar>}
  </>
 );
};

export default Header;
