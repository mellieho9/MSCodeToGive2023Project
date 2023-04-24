import { useState } from 'react';
import { VStack, HStack, Button, Input, FormControl, FormLabel, Grid, GridItem, Box, Heading, Image } from '@chakra-ui/react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addOrderItemAction, removeOrderItemAction } from '../redux/action';

const initialInventory = [
  { id: 1, name: 'Apples', quantity: 50, expiryDate: '2023-06-30', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Oranges', quantity: 25, expiryDate: '2023-07-15', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Bananas', quantity: 40, expiryDate: '2023-07-10', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Grapes', quantity: 30, expiryDate: '2023-06-20', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Strawberries', quantity: 20, expiryDate: '2023-06-22', image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Blueberries', quantity: 35, expiryDate: '2023-07-01', image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Raspberries', quantity: 15, expiryDate: '2023-06-18', image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Watermelon', quantity: 10, expiryDate: '2023-07-05', image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Pineapple', quantity: 5, expiryDate: '2023-07-08', image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Mango', quantity: 15, expiryDate: '2023-07-12', image: 'https://via.placeholder.com/150' }
];


function Inventory() {
  const dispatch = useDispatch();
  const inventory = initialInventory;
  const [orderItems, setOrderItems] = useState([]);
  const [showButtons, setShowButtons] = useState({});

  function addToOrder(item, quantity) {
    const existingOrderItem = orderItems.find(orderItem => orderItem.id === item.id);
    const inventoryItem = inventory.find(inventoryItem => inventoryItem.id === item.id);
    if (existingOrderItem) {
      const updatedOrderItem = { ...existingOrderItem,  name: inventoryItem.name, quantity: existingOrderItem.quantity + quantity };
      console.log(updatedOrderItem)
      dispatch(addOrderItemAction(updatedOrderItem));
    } else {
      const newOrderItem = {
        id: item.id,
        name: inventoryItem.name,
        quantity: quantity,
      };
      dispatch(addOrderItemAction(newOrderItem));
    }
    setShowButtons({ ...showButtons, [item.id]: false });
  }
  

  function removeOrderItem(id) {
    dispatch(removeOrderItemAction(id));
  }

  function increaseQuantity(itemId) {
    const inventoryItem = inventory.find(inventoryItem => inventoryItem.id === itemId);
    setOrderItems(orderItems => {
      const index = orderItems.findIndex(orderItem => orderItem.id === itemId);
      
      if (index >= 0) {
        const newOrderItems = [...orderItems];
        newOrderItems[index] = { ...newOrderItems[index],name: inventoryItem.name, quantity: newOrderItems[index].quantity + 1 };
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
        const newQuantity = newOrderItems[index].quantity - 1;
        if (newQuantity > 0) {
          newOrderItems[index] = { ...newOrderItems[index], name: inventoryItem.name, quantity: newQuantity };
          return newOrderItems;
        } else {
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
          <Box p={4} borderWidth="1px" borderRadius="lg" minH="400px" w="100%">
            <VStack>
              <Image src={item.image} alt={item.name} mb={2} />
              <Heading size="md" mb={2}>{item.name}</Heading>
              <Box mt={2}>Available: {item.quantity}</Box>
              <Box ml={4} mb={4}>Expiry Date: {item.expiryDate}</Box>
              {showButtons[item.id] ? (
                <VStack  spacing="4">
                  <HStack mt={2}>
                    <Button onClick={() => increaseQuantity(item.id)} size="sm"><FaPlus /></Button>
                    <Box>{orderItems.find(orderItem => orderItem.id === item.id)?.quantity ?? 0}</Box>
                    <Button onClick={() => decreaseQuantity(item.id)} size="sm"><FaMinus /></Button>
                  </HStack> 
                  <Button onClick={() => addToOrder(item, orderItems.find(orderItem => orderItem.id === item.id).quantity)} colorScheme="orange" ml={2}>
                    Add to Order
                  </Button>
                </VStack>
              ) : (
                <Button  onClick={() => setShowButtons({...showButtons,[item.id]: true})} colorScheme="orange" ml={2}>
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