import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Link as ChakraLink, Icon, Button, Image, useDisclosure } from "@chakra-ui/react";
import { FaShoppingCart, FaTruck, FaMapMarkerAlt, FaBoxOpen, FaCalendarAlt, FaUser } from "react-icons/fa";
import logo from '../images/logo.png';
import PartnerInfo from "./PartnerInfo";
import { useHistory } from "react-router-dom";

function NavBar({ userRole, onLogout }) {
  const isPartner = userRole === "partner";
  const isAFCB = userRole === "afcb";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    onLogout(); 
    history.push("/login");
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
    onOpen();
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    onClose();
  }
  



  return (
    <Flex bg="white" p="5" alignItems="center" boxShadow="md">
      <Box flex="1" display="flex" flexDirection="row">
        <Link to="/">
          <Image src={logo} alt="Logo" w="150px" cursor="pointer" />
        </Link>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" color="black">
        {isPartner && (
          <>
            <Link to="/delivery-status">
              <ChakraLink display="flex" alignItems="center" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid orange" }}>
                <Icon as={FaTruck} mr={2} />
                Delivery Status
              </ChakraLink>
            </Link>
            <Link to="/inventory">
              <ChakraLink display="flex" alignItems="center" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid orange" }}>
                <Icon as={FaBoxOpen} mr={2} />
                Available Items
              </ChakraLink>
            </Link>
            <Link to="/order">
              <ChakraLink display="flex" alignItems="center" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid orange" }}>
                <Icon as={FaShoppingCart} mr={2} />
                Order
              </ChakraLink>
            </Link>
              <ChakraLink display="flex" alignItems="center" onClick={handleDrawerOpen} _hover={{ textDecoration: "none", borderBottom: "2px solid orange" }}>
                <Icon as={FaUser} mr={2} />
                Profile
              </ChakraLink>
              <PartnerInfo isDrawerOpen={isDrawerOpen} onClose={handleDrawerClose} />
          </>
        )}
        {isAFCB && (
          <>
            <Link to="/map">
              <ChakraLink display="flex" alignItems="center" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid orange" }}>
                <Icon as={FaMapMarkerAlt} mr={2} />
                Map
              </ChakraLink>
            </Link>
            <Link to="/order">
              <ChakraLink display="flex" alignItems="center" mr="4" _hover={{ textDecoration: "none", borderBottom: "2px solid orange" }}>
                <Icon as={FaShoppingCart} mr={2} />
                Orders
              </ChakraLink>
            </Link>
          </>
        )}
        <ChakraLink ml={4} mr={4} color="orange.500" _hover={{ textDecoration: "none", borderBottom: "2px solid orange"}} onClick={onLogout}>
          Logout
        </ChakraLink>
      </Box>
    </Flex>
  );
}

export default NavBar;