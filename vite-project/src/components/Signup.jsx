import  { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Stack, Alert } from '@chakra-ui/react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/auth/signup', { email, password });
      setError('');
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box
        maxW="md"
        w="full"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Heading as="h2" mb={6} textAlign="center">
          Signup
        </Heading>
        {error && <Alert status="error" mb={4}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="confirm-password">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormControl>
            <div className='flex justify-center items-center gap-3'>
              <p className='text-[18px] font-bold'>Already a User?</p>
              <Link to="/">
                <Button colorScheme="teal">Login</Button>
              </Link>
            </div>
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
              Signup
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
