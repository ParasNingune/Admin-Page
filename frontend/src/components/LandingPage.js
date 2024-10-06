// src/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';

export default function LandingPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [tabIndex, setTabIndex] = useState(0); // State for the active tab
    const navigate = useNavigate();
    const toast = useToast(); // Initialize Chakra UI toast

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:5000/auth/login', { username, password });
            localStorage.setItem('token', data.token);

            // Display success toast on successful login
            toast({
                title: 'Login Successful',
                description: 'You have logged in successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });

            navigate('/dashboard'); // Navigate after login
        } catch (err) {
            // Display error toast if login fails
            toast({
                title: 'Invalid Credentials',
                description: 'Please check your username and password.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            setError('Invalid Credentials');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post('http://localhost:5000/auth/register', { username, password });
            console.log('success')
            setError(''); // Clear any previous error
            // Display success toast on successful registration
            toast({
                title: 'User Created Successfully',
                description: 'Your account has been created successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
    
            setTabIndex(0); // Switch to Login tab after successful registration
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error during registration';
            setError(errorMessage);
            console.error(err);
            // Optionally, you can show an error toast here if registration fails
            toast({
                title: 'Registration Failed',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    return (
        <Box
            height="100vh"
            width="100vw"
            bgGradient="linear(to-b, green.600, green.200)"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                height={500}
                width={400}
                backgroundColor="white"
                borderRadius="md"
                boxShadow="xl"
                padding={8}
            >
                <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6} color="green.600">
                    Welcome!
                </Text>
                <Tabs colorScheme="green" isFitted variant={'soft-rounded'} index={tabIndex} onChange={setTabIndex}>
                    <TabList mb={4}>
                        <Tab
                            fontSize={20}
                            fontWeight={600}
                            _selected={{ bg: 'green.500', color: 'white' }}
                            transition="background 0.2s"
                        >
                            Login
                        </Tab>
                        <Tab
                            fontSize={20}
                            fontWeight={600}
                            _selected={{ bg: 'green.500', color: 'white' }}
                            transition="background 0.2s"
                        >
                            Register
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box>
                                <FormControl mb={4}>
                                    <FormLabel fontSize={18}>Username</FormLabel>
                                    <Input
                                        type="username"
                                        placeholder="Enter your username"
                                        fontSize={18}
                                        borderColor="green.500"
                                        focusBorderColor="green.300"
                                        _hover={{ borderColor: 'green.300' }}
                                        bg="gray.50"
                                        padding={4}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl mb={6}>
                                    <FormLabel fontSize={18}>Password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        fontSize={18}
                                        borderColor="green.500"
                                        focusBorderColor="green.300"
                                        _hover={{ borderColor: 'green.300' }}
                                        bg="gray.50"
                                        padding={4}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                                <Button
                                    bg="green.500"
                                    color="white"
                                    width="full"
                                    padding={6}
                                    fontSize={18}
                                    _hover={{ bg: 'green.600' }}
                                    _active={{ bg: 'green.700' }}
                                    transition="background 0.2s"
                                    borderRadius="full"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                                {/* Display error message if any */}
                                {error && (
                                    <Text color="red.500" mt={4} textAlign="center">
                                        {error}
                                    </Text>
                                )}
                            </Box>
                        </TabPanel>

                        <TabPanel>
                            <Box>
                                <FormControl mb={4}>
                                    <FormLabel fontSize={18}>Username</FormLabel>
                                    <Input
                                        type="username"
                                        placeholder="Enter your username"
                                        fontSize={18}
                                        borderColor="green.500"
                                        focusBorderColor="green.300"
                                        _hover={{ borderColor: 'green.300' }}
                                        bg="gray.50"
                                        padding={4}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl mb={6}>
                                    <FormLabel fontSize={18}>Password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        fontSize={18}
                                        borderColor="green.500"
                                        focusBorderColor="green.300"
                                        _hover={{ borderColor: 'green.300' }}
                                        bg="gray.50"
                                        padding={4}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                                <Button
                                    bg="green.500"
                                    color="white"
                                    width="full"
                                    padding={6}
                                    fontSize={18}
                                    _hover={{ bg: 'green.600' }}
                                    _active={{ bg: 'green.700' }}
                                    transition="background 0.2s"
                                    borderRadius="full"
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>
                                {/* Display error message if any */}
                                {error && (
                                    <Text color="red.500" mt={4} textAlign="center">
                                        {error}
                                    </Text>
                                )}
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
}
