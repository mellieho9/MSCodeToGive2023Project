import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
} from '@chakra-ui/react';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    foodItem: '',
    quantity: '',
    status: '',
  });

  const handleInputChange = (event) => {
    setNewOrder({
      ...newOrder,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddOrder = (event) => {
    event.preventDefault();
    setOrders([...orders, newOrder]);
    setNewOrder({
      foodItem: '',
      quantity: '',
      status: '',
    });
  };

  const handleDeleteOrder = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  return (
    <Box p={4}>
      <Heading py={4}>Orders</Heading>
      <HStack mt="4" align="stretch" spacing="8" alignItems={"end"}>
        <FormControl isRequired>
          <FormLabel>Food Item</FormLabel>
          <Input
            type="text"
            name="foodItem"
            value={newOrder.foodItem}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Status</FormLabel>
          <Input
            type="text"
            name="status"
            value={newOrder.status}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button flexShrink="0" colorScheme="orange" onClick={handleAddOrder}>
          Add Order
        </Button>
      </HStack>
      <Box mt="4">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Food Item</Th>
              <Th>Quantity</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, index) => (
              <Tr key={index}>
                <Td>{order.foodItem}</Td>
                <Td>{order.quantity}</Td>
                <Td>{order.status}</Td>
                <Td>
                  <Button  colorScheme="orange" size="sm" onClick={() => handleDeleteOrder(index)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default Orders;
