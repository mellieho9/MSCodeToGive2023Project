import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { removeOrderItemAction, updateOrderItemAction } from '../redux/action';
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
  const orders = useSelector((state) => state.orderItems);
  const dispatch = useDispatch();
  const [orderComplete, setOrderComplete] = useState(false);
  const handleQuantityChange = (index, change) => {
    const orderToUpdate = orders[index];
    if (orderToUpdate) {
      const updatedOrder = { ...orderToUpdate, quantity: orderToUpdate.quantity + change };
      dispatch(updateOrderItemAction(updatedOrder.id, updatedOrder.quantity));
    }
  };

  const handleDeleteOrder = (index) => {
    dispatch(removeOrderItemAction(orders[index].id));
  };

  const handleCompleteOrder = () => {
    // Add logic to handle order completion
    setOrderComplete(true)
  };

  const handleJoinGroupOrder = () => {
    // Add logic to handle joining a group order
    console.log('Joining a group order');
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

            {orders.map((order, index) => (
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

  return (
    <Box p={4}>
      <Heading py={4}>Orders</Heading>
      {orders.length > 0 && !orderComplete ? (
        <>
          {renderOrdersTable()}
          <Button
            mt={4}
            backgroundColor="#FF7A00"
            color={'white'}
            onClick={handleCompleteOrder}
          >
            Complete Order
          </Button>
        </>
      ) : (
        orderComplete ? (<Text>Order complete! Check "Delivery status" to see its status. </Text>) : 
        (<Text>No orders yet. Go to 'Available Items' to see possible items you can order.</Text>)
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

