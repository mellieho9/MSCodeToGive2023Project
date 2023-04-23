import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Flex,
  Image,
  HStack,
  Link
} from '@chakra-ui/react';
import logo from "../images/logo.png";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name) {
          alert('Please enter your full name.');
          return;
        }
        
        fetch('http://localhost:3000/userCredentials/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: pass })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // If the response is successful, redirect the user to the login page
            window.location.href = '/login';
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
    }

    const handleFormSwitch = (formName) => {
        props.onFormSwitch(formName);
      };

    return (
      <Box p={20}  alignItems="center">
      <VStack justifyContent="center" >
        <Flex alignItems="center" mb={4}>
          <Image src={logo} alt="FoodRoute Logo" mr={2} />
        </Flex>
        <Heading py={4}>Create an account</Heading>
        <VStack spacing={4} width="75%" >
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            width="100%"
          />
        </FormControl>
        <FormControl mt="4">
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            width="100%"
          />
        </FormControl>
        <FormControl mt="4" mb="20">
          <FormLabel>Password</FormLabel>
          <Input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            width="100%"
          />
        </FormControl>
        <Button
          
          colorScheme="orange"
          width="100%"
          onClick={handleSubmit}
        >
          Register
        </Button>
        </VStack>
        <HStack mt="4">
          <Text>Already have an account?</Text>
          <Link color="orange.500" onClick={() => handleFormSwitch("login")}>
            Log in here.
          </Link>
        </HStack>
      </VStack>
    </Box>
    )
}
export default Register;