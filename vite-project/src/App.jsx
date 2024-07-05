// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Box, Stack } from '@chakra-ui/react';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <Router>
//       <Box textAlign="center" p={4}>
//         <Stack direction="row" spacing={4} justify="center" mb={4}>
//           {/* <Link to="/login">
//             <Button colorScheme="teal">Login</Button>
//           </Link>
//           <Link to="/signup">
//             <Button colorScheme="teal">Signup</Button>
//           </Link>
//           <Link to="/dashboard">
//             <Button colorScheme="teal">Dashboard</Button>
//           </Link> */}
//         </Stack>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </Box>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Preventback from './components/Preventback';
import Preventlog from './components/Preventlog';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Preventback><Login /></Preventback>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Preventlog><Dashboard /></Preventlog>} />
      {/* <Route path="/logout" element={<Signup />} /> */}
    </Routes>
  );
}

export default App;
