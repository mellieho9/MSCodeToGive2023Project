import React, { useState } from "react";
import Auth from '../api/Auth';
import { useHistory } from "react-router-dom";
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
  HStack
} from '@chakra-ui/react';
import logo from "../images/logo.png";


export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/backend/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        props.onLogin();
        history.push("/");
      } else {
        setErrorMessage("Incorrect email or password.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleFormSwitch = (formName) => {
    props.onFormSwitch(formName);
  };

  return (
    <Box p={20} alignItems="center" >
      <VStack justifyContent="center" spacing={6}>
        <Flex alignItems="center" mb={4}>
          <Image src={logo} alt="FoodRoute Logo" mr={2} />
        </Flex>
        <Heading as="h2" size="lg">
            Sign in to FoodRoute
        </Heading>
        <Box width={"75%"}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
        </FormControl>
        <FormControl mt="4">
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
        </FormControl>
        <Button mt="10" colorScheme="orange" w="100%" onClick={handleSubmit}>
          Sign In
        </Button>
        </Box>
        {errorMessage && <Text color="red">{errorMessage}</Text>}
        <HStack mt="4">
          <Text>Don't have an account?</Text>
          <Button
            variant="link"
            colorScheme="orange"
            onClick={() => handleFormSwitch('register')}
          >
            Register here.
          </Button>
          
        </HStack>
        
      </VStack>
    </Box>
  );
}
export default Login;
