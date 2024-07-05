import { useState, useEffect, useRef } from 'react';
import { Box, Grid, Heading, Button, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRewards } from '../rewards/rewardsSlice';
import ScratchCard from './ScratchCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const allRewards = useSelector(selectRewards);
  const toast = useToast();

  const [selectedRewards, setSelectedRewards] = useState([]);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const cancelRef = useRef();

  useEffect(() => {
    const getSavedRewards = () => {
      const savedRewards = localStorage.getItem('selectedRewards');
      return savedRewards ? JSON.parse(savedRewards) : [];
    };

    const savedRewards = getSavedRewards();

    if (savedRewards.length > 0) {
      setSelectedRewards(savedRewards);
    } else {
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const shuffledRewards = shuffleArray([...allRewards]);
      const randomSelection = shuffledRewards.slice(0, 3);

      setSelectedRewards(randomSelection);
      localStorage.setItem('selectedRewards', JSON.stringify(randomSelection));
    }
  }, [allRewards]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout');
      localStorage.removeItem('token');

      toast({
        title: 'Logged out.',
        description: 'You have successfully logged out.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: 'Logout failed.',
        description: 'An error occurred while logging out. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={4}>
      <Heading as="h1" mb={8}>Your Rewards</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {selectedRewards.map((reward, index) => (
          <ScratchCard key={index} reward={reward} revealedInitially={true} />
        ))}
      </Grid>
      <Button onClick={() => setIsLogoutAlertOpen(true)} mt={4}>
        Logout
      </Button>

      <AlertDialog
        isOpen={isLogoutAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsLogoutAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsLogoutAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Dashboard;
