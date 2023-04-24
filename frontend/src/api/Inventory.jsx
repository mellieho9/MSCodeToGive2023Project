import { useState, useEffect } from 'react';
import { VStack, HStack, Button, Input, FormControl, FormLabel, Grid, GridItem, Box, Heading, Image } from '@chakra-ui/react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch, getState } from 'react-redux';
import { addOrderItemAction, removeOrderItemAction } from '../redux/action';
import store from '../redux/store';


function Inventory() {
  const dispatch = useDispatch();
  const [initialInventory, setInitialInventory] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/databases/inventory')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setInitialInventory(data)})
      .catch(error => console.log(error));
  }, []);
  const inventory = initialInventory;
  const [orderItems, setOrderItems] = useState([]);
  const [showButtons, setShowButtons] = useState({});

  function addToOrder(item) {
    const inventoryItem = inventory.find(inventoryItem => inventoryItem.id === item.id);
    const newOrderItem = {
      id: item.id,
      name: inventoryItem.name,
      quantity: 50,
    };
    setOrderItems([...orderItems, newOrderItem]);
    dispatch(addOrderItemAction(newOrderItem.id,newOrderItem.name,newOrderItem.quantity));
    setShowButtons({ ...showButtons, [item.id]: false });
    console.log('Current store state:', store.getState());
  }

  function increaseQuantity(itemId) {
    const inventoryItem = inventory.find(inventoryItem => inventoryItem.id === itemId);
    setOrderItems(orderItems => {
      const index = orderItems.findIndex(orderItem => orderItem.id === itemId);
      
      if (index >= 0) {
        const newOrderItems = [...orderItems];
        newOrderItems[index] = { ...newOrderItems[index],name: inventoryItem.name, quantity: newOrderItems[index].quantity + 50 };
        console.log(newOrderItems)
        dispatch(removeOrderItemAction(itemId));
        dispatch(addOrderItemAction(newOrderItems[index].id,newOrderItems[index].name,newOrderItems[index].quantity+50))
        console.log('Current store state:', store.getState());
        return newOrderItems;
      } else {
        return [...orderItems, { id: itemId, name: inventoryItem.name, quantity: 1 }];
      }
    });
  }
  
  function decreaseQuantity(itemId) {
    const inventoryItem = inventory.find(inventoryItem => inventoryItem.id === itemId);
    setOrderItems(orderItems => {
      const index = orderItems.findIndex(orderItem => orderItem.id === itemId);
      if (index >= 0) {
        const newOrderItems = [...orderItems];
        const newQuantity = newOrderItems[index].quantity - 50;
        if (newQuantity > 0) {
          newOrderItems[index] = { ...newOrderItems[index], name: inventoryItem.name, quantity: newQuantity };
          dispatch(removeOrderItemAction(itemId));
          dispatch(addOrderItemAction(newOrderItems[index].id,newOrderItems[index].name,newOrderItems[index].quantity-50))
          console.log('Current store state:', store.getState());

          return newOrderItems;
        } else {
          dispatch(removeOrderItemAction(itemId));
          console.log('Current store state:', store.getState());
          return newOrderItems.filter(orderItem => orderItem.id !== itemId);
        }
      } else {
        return orderItems;
      }
    });
  }
  

  function toggleButtons(id) {
    setShowButtons({ ...showButtons, [id]: !showButtons[id] });
  }

  return (
  <Box p={4} >
  <Heading p={4}>Available Items</Heading>
  <VStack spacing="4">
    <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
      {inventory.map(item => (
        <GridItem key={item.id}>
          <Box p={4} borderWidth="1px" borderRadius="lg" minH="200" w="100%">
            <VStack alignItems="center" >
              <Heading size="md" mb={2}>{item.name}</Heading>
              <Box mt={2}>Available: {item.quantity} lbs</Box>
              <Box ml={4} mb={4}>Expiry Date: {item.expiryDate}</Box>
              {showButtons[item.id] > 0 ? (

                <VStack  spacing="4">
                  <HStack mt={2}>
                    <Button onClick={() => increaseQuantity(item.id)} size="sm"><FaPlus /></Button>
                    <Box>{orderItems.find(orderItem => orderItem.id === item.id)?.quantity ?? 0}</Box>
                    <Button onClick={() => decreaseQuantity(item.id)} size="sm"><FaMinus /></Button>
                  </HStack> 
                </VStack>
              ) : (
                <Button  onClick={() => {
                  addToOrder(item);
                  setShowButtons({...showButtons,[item.id]: true})}} colorScheme="orange" ml={2}>
                  Add to Order
                </Button>
              )}
            </VStack>
          </Box>
        </GridItem>
      ))}
    </Grid>
  </VStack>
</Box>

  );
}

export default Inventory;