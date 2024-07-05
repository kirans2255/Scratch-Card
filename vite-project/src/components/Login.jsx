import  { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Stack, Alert } from '@chakra-ui/react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const BASE_URL = 'http://localhost:3000/'

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      setError('');
  
      // Store user rewards
      localStorage.setItem('selectedRewards', JSON.stringify(res.data.rewards));
  
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/google', {
        token: credentialResponse.credential,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
  
      // Store user rewards
      localStorage.setItem('selectedRewards', JSON.stringify(res.data.rewards));
  
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed');
    }
  };
  

  const handleGoogleLoginFailure = () => {
    setError('Google login failed');
  };

  

  return (
    <GoogleOAuthProvider clientId="1057915866808-jjf566o5s7ak6bvm8cbqhr347p0seeom.apps.googleusercontent.com">
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
            Login
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
              <div className='flex justify-center items-center gap-3'>
              <p className='text-[18px] font-bold'>New User?</p>
              <Link to="/signup">
                <Button colorScheme="teal">Signup</Button>
              </Link>
            </div>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Login
              </Button>
            </Stack>
          </form>
          <Box mt={4}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
            />
          </Box>
        </Box>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default Login;
