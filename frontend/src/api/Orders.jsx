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
  IconButton,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

function Orders() {
  const [orders, setOrders] = useState([{ foodItem: 'Apples', quantity: 2000, total: 5, orderId: 'ABC123', deliveryDate: '2023-05-01', }, { foodItem: 'Bananas', quantity: 3000, total: 7, orderId: 'DEF456', deliveryDate: '2023-05-02', },]);
  
  const handleQuantityChange = (index, change) => {
    const newOrders = [...orders];
    const order = newOrders[index];
    order.quantity += change;
    order.total = Math.ceil(order.quantity / 1000);
    setOrders(newOrders);
  };

  const renderOrdersTable = () => {
    return (
      <Box mt="4">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Food Item</Th>
              <Th>Quantity (lbs)</Th>
              <Th>Total</Th>
              <Th>Order ID</Th>
              <Th>Delivery Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, index) => (
              <Tr key={index}>
                <Td>{order.foodItem}</Td>
                <Td>
                  <HStack>
                    <IconButton
                      icon={<MinusIcon />}
                      aria-label="Decrease Quantity"
                      size="sm"
                      isDisabled={order.quantity <= 1000}
                      onClick={() => handleQuantityChange(index, -1000)}
                    />
                    <Text>{order.quantity}</Text>
                    <IconButton
                      icon={<AddIcon />}
                      aria-label="Increase Quantity"
                      size="sm"
                      onClick={() => handleQuantityChange(index, 1000)}
                    />
                  </HStack>
                </Td>
                <Td>{order.total}</Td>
                <Td>{order.orderId}</Td>
                <Td>{order.deliveryDate}</Td>
                <Td>
                  <Button
                    colorScheme="orange"
                    size="sm"
                    onClick={() => handleDeleteOrder(index)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };

  const handleDeleteOrder = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  return (
    <Box p={4}>
      <Heading py={4}>Orders</Heading>
      {orders.length > 0 ? (
        renderOrdersTable()
      ) : (
        <Text>No orders yet.</Text>
      )}
      {orders.reduce((sum, order) => sum + order.quantity, 0) < 6000 && (
        <>
          <Heading mt="8" size="md">
            Join a Group Order
          </Heading>
          <FormControl mt="4">
            <FormLabel>Order ID</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Delivery Date and Time</FormLabel>
            <Input type="datetime-local" />
          </FormControl>
          <Text mt="8" fontWeight="bold">
            Available Groups:
          </Text>
          <List mt="4">
            <ListItem>Group 1</ListItem>
            <ListItem>Group 2</ListItem>
            <ListItem>Group 3</ListItem>
          </List>
        </>
      )}
    </Box>
  );
}

export default Orders;