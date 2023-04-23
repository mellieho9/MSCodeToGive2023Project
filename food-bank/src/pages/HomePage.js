import React from 'react';
import logo from '../images/logo.png';
import smile from '../images/smile.jpg';
import { Link } from "react-router-dom";
import { HStack,Link as ChakraLink, Image, Box, Text, Center, Badge, Icon, Heading, VStack } from '@chakra-ui/react'
import {FaShoppingCart} from "react-icons/fa";

function HomePage() {
  return (
    <VStack p={4} spacing ={5}>
      <Heading color="#FF7A00" p={4} textAlign="center">Welcome to Atlanta Community Food Bank</Heading>
      <Box backgroundColor={'#F7961D'} borderRadius={'15px'} display="flex" alignItems={"center"}>
        <Image src={smile} boxSize="300px" objectFit={'cover'} borderRadius={'15px 0 0 15px'}/>
        <Box ml={8} p={4} spacing={5}>
          <Heading fontWeight={"medium"} color="white" fontSize="3xl" mb={5}>The center for Community Food, linking households and individuals in need with essential groceries.</Heading>
          <HStack>
            <Badge borderRadius={'2px'} color={'#FF7A00'} mr={4} fontSize="xl" py={2} px={4} backgroundColor='white'>Food is available</Badge> 
            <Link to="/order">
              <ChakraLink  display="flex" alignItems="center" color="white" fontSize="xl" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
                <Icon as={FaShoppingCart} mr={2} />
                Order Now
              </ChakraLink>
            </Link>
          </HStack>          
        </Box>
      </Box>
      <VStack spacing={4}>
      <Text mt={4} fontSize="xl">The Atlanta Community Food Bank is a non-profit organization that provides access to nutritious food for
          people in need across the metro Atlanta area. Our work with a network of partner agencies 
          and programs to distribute food to those who are struggling with hunger. 
          <Heading mt={4}>Our mission</Heading>
          <Text mt={4} fontSize="lg" mb={8}>To fight hunger by engaging, educating, and empowering the community, and our vision is 
          a hunger-free community. Customers can order food through the Atlanta Community Food 
          Bank's partner agencies and programs, or they can get involved by volunteering, donating,
          or for food justice.</Text>
      </Text>  
      </VStack>
    </VStack>
  );
}

export default HomePage;