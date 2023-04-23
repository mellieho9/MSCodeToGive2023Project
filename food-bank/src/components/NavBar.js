import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Link as ChakraLink, Icon, Button } from "@chakra-ui/react";
import { FaHome, FaShoppingCart, FaTruck, FaMapMarkerAlt, FaBoxOpen, FaCalendarAlt, FaUser } from "react-icons/fa";

function NavBar({ userRole }) {
  const isPartner = userRole === "partner";
  const isAFCB = userRole === "afcb";

  return (
    <Flex bg="#FF7A00" p="5" alignItems="center">
      <Box flex="1" display="flex" flexDirection="row">
        <Link to="/">
          <ChakraLink display="flex" alignItems="center" color="white" fontWeight="bold" fontSize="2xl" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
            <Icon as={FaHome} mr={2} />
            Home
          </ChakraLink>
        </Link>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center"> 
        {isPartner && (
          <>
          <Link to="/delivery-status">
              <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
                <Icon as={FaTruck} mr={2} />
                Delivery Status
              </ChakraLink>
            </Link>
            <Link to="/inventory">
              <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
                <Icon as={FaBoxOpen} mr={2} />
                Available Items
              </ChakraLink>
            </Link>
            <Link to="/order">
              <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
                <Icon as={FaShoppingCart} mr={2} />
                Order
              </ChakraLink>
            </Link>
            
            
            <Link to="/profile">
              <ChakraLink display="flex" alignItems="center" color="white" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
                <Icon as={FaUser} mr={2} />
                Profile
              </ChakraLink>
            </Link>
          </>
        )}
        {isAFCB && (
          <>
            <Link to="/map">
              <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
                <Icon as={FaMapMarkerAlt} mr={2} />
                Map
              </ChakraLink>
            </Link>
            <Link to="/order">
              <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
                <Icon as={FaShoppingCart} mr={2} />
                Orders
              </ChakraLink>
            </Link>
          </>
        )}
        <Button ml={4} colorScheme="red" >
          Logout
        </Button>
      </Box>
    </Flex>
  );
}

export default NavBar;
