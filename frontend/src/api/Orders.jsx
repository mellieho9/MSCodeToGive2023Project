
import React, { useState, useEffect } from 'react';
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
import { useDispatch, getState } from 'react-redux';
import { removeOrderItemAction, updateOrderItemAction } from '../redux/action';
import store from '../redux/store';

function Orders() {
  // const [orders, setOrders] = useState([{ foodItem: 'Apples', quantity: 2000, total: 5, orderId: 'ABC123', deliveryDate: '2023-05-01', }, { foodItem: 'Bananas', quantity: 3000, total: 7, orderId: 'DEF456', deliveryDate: '2023-05-02', },]);
  const dispatch = useDispatch();
  const state = store.getState();
  const orders = state.orderItems;
  const [localOrders, setLocalOrders] = useState(orders);


  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleQuantityChange = (index, change) => {
    const orderToUpdate = localOrders[index];
    if (orderToUpdate) {
      const updatedOrder = { ...orderToUpdate, quantity: orderToUpdate.quantity + change };
      const updatedOrders = [...localOrders];
      updatedOrders[index] = updatedOrder;
      setLocalOrders(updatedOrders);
      dispatch(updateOrderItemAction(updatedOrder.id, updatedOrder.quantity));
      console.log(state)
    }
  };

  const renderOrdersTable = () => {
    return (
      <Box mt="4">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Food Item</Th>
              <Th>Quantity (lbs)</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {localOrders.map((order, index) => (
              <Tr key={index}>
                <Td>{order.name}</Td>
                <Td>
                  <HStack>
                    <IconButton
                      icon={<MinusIcon />}
                      aria-label="Decrease Quantity"
                      size="sm"
                      isDisabled={order.quantity <= 1}
                      onClick={() => handleQuantityChange(index, -50)}
                    />
                    <Text>{order.quantity}</Text>
                    <IconButton
                      icon={<AddIcon />}
                      aria-label="Increase Quantity"
                      size="sm"
                      onClick={() => handleQuantityChange(index, 50)}
                    />
                  </HStack>
                </Td>
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
    dispatch(removeOrderItemAction(localOrders[index].id));
    const updatedOrders = localOrders.filter((order, i) => i !== index);
    console.log(updatedOrders)
    setLocalOrders(updatedOrders);
    console.log(state)
  };

  return (
    <Box p={4}>
      <Heading py={4}>Orders</Heading>
      {localOrders.length > 0 ? (
        renderOrdersTable()
      ) : (
        <Text>No orders yet.</Text>
      )}
      {localOrders.reduce((sum, order) => sum + order.quantity, 0) < 6000 && (
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