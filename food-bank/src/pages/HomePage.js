import React from 'react';
import logo from '../images/logo.png';
import smile from '../images/smile.jpg';
import { Link } from "react-router-dom";
import { Link as ChakraLink, Image, Box, Text, Center, Badge, Icon } from '@chakra-ui/react'
import {FaShoppingCart} from "react-icons/fa";
function HomePage() {
  return (
    <Box >
      <Image src={logo} alt='ACFB Logo' mt="10px" ml="10px" />
      <Center mb={'-25px'} color="#FF7A00" fontSize="80px" textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">Welcome </Center>
      <Center mb={'10px'} color="#FF7A00" fontSize="80px" textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">to Atlanta Community Food Bank</Center>
      <Center backgroundColor={'#FF7A00'} borderRadius={'15px'}>
        <Image src={smile} boxSize="700px" objectFit={'cover'}  borderRadius={'15px'}/>
        <Box>
          <Box>
            <Center fontSize={'50px'} ml={'10px'} fontFamily={'Caveat'} color={'white'} mb="20px">The center for Community Food links households and individuals in need with essential groceries.</Center>
          </Box>
          
          <Center>
            <Badge borderRadius={'2px'} color={'#FF7A00'} mt={'15px'} fontSize={'30px'} backgroundColor='white'>Food is available</Badge> 
            <Link to="/order">
              <ChakraLink mt={'15px'} ml={'20px'} fontSize={'30px'} display="flex" alignItems="center" color="white" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
                <Icon as={FaShoppingCart} mr={2} />
                Order Now
              </ChakraLink>
            </Link>
            
          </Center>          
        </Box>
      </Center>
      
      
      
      <Text mt={'20px'} ml={'10px'} fontSize={'20px'} fontFamily={'Caveat'}  >The Atlanta Community Food Bank is a non-profit organization that provides access to nutritious food for
          people in need across the metro Atlanta area. Our work with a network of partner agencies 
          and programs to distribute food to those who are struggling with hunger. 
          Our mission is to fight hunger by engaging, educating, and empowering the community, and our vision is 
          a hunger-free community. Customers can order food through the Atlanta Community Food 
          Bank's partner agencies and programs, or they can get involved by volunteering, donating,
          or for food justice.
      </Text>
      
    </Box>
  );
}

export default HomePage;