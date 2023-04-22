import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Link as ChakraLink, Icon } from "@chakra-ui/react";
import { FaHome, FaShoppingCart, FaComments, FaTruck, FaMapMarkerAlt, FaBoxOpen, FaCalendarAlt } from "react-icons/fa";

function NavBar() {
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
      <Box display="flex" flexDirection="row">
        <Link to="/order">
          <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
            <Icon as={FaShoppingCart} mr={2} />
            Order
          </ChakraLink>
        </Link>
        <Link to="/feedback">
          <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
            <Icon as={FaComments} mr={2} />
            Feedback
          </ChakraLink>
        </Link>
        <Link to="/delivery-status">
          <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
            <Icon as={FaTruck} mr={2} />
            Delivery Status
          </ChakraLink>
        </Link>
        <Link to="/map">
          <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
            <Icon as={FaMapMarkerAlt} mr={2} />
            Map
          </ChakraLink>
        </Link>
        <Link to="/inventory">
          <ChakraLink display="flex" alignItems="center" color="white" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
            <Icon as={FaBoxOpen} mr={2} />
            Inventory
          </ChakraLink>
        </Link>
        <Link to="/calendar">
          <ChakraLink display="flex" alignItems="center" color="white" _hover={{ textDecoration: "none", borderBottom: "2px solid white" }}>
            <Icon as={FaCalendarAlt} mr={2} />
            Calendar
          </ChakraLink>
        </Link>
      </Box>
    </Flex>
  );
}

export default NavBar;
