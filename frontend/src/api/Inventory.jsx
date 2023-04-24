import { useState, useEffect } from 'react';
import { VStack, HStack, Button, Input, FormControl, FormLabel, Grid, GridItem, Box, Heading, Image } from '@chakra-ui/react';
import logo from "../images/logo.png"
import { useDispatch, useSelector, useStore } from 'react-redux';
import { addOrderItemAction, removeOrderItemAction } from '../redux/action';
import store from '../redux/store';


function Inventory() {
  const dispatch = useDispatch();
  const [initialInventory, setInitialInventory] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/databases/inventory')
      .then(response => response.json())
      .then(data => {
        setInitialInventory(data)
      })
      .catch(error => console.log(error));
  }, []);
  const inventory = initialInventory;
  const [orderItems, setOrderItems] = useState([]);
  const [showButtons, setShowButtons] = useState({});
  const [inputValues, setInputValues] = useState({});
  function addToOrder(item) {
    const inventoryItem = inventory.find(inventoryItem => inventoryItem.id === item.id);
    const newOrderItem = {
      
    };
    setOrderItems([...orderItems]);
    setInputValues({ ...inputValues, [item.id]: '' });
  
    console.log('Current store state:', store.getState());
  }
  function handleQuantityChange(itemId, event) {

    const inputValue = event.target.value;
    const newValue = inputValue === '' ? '' : parseInt(inputValue) || 0;

    setInputValues({ ...inputValues, [itemId]: inputValue });

    const inventoryItem = inventory.find(inventoryItem => inventoryItem.id === itemId);
    if (newValue > inventoryItem.quantity) {
      alert('You cannot order more than the available quantity.');
      return;
    }
    const index = orderItems.findIndex(orderItem => orderItem.id === itemId);
    const newOrderItems = [...orderItems];
    const orderItemIndex = orderItems.findIndex(orderItem => orderItem.id === itemId);
    const newInventory = [...inventory];
    const inventoryItemIndex = inventory.findIndex(invItem => invItem.id === itemId);
    if (orderItemIndex >= 0) {
      const prevValue = newOrderItems[orderItemIndex].quantity;
      newOrderItems[orderItemIndex] = { ...newOrderItems[orderItemIndex], name: inventoryItem.name, quantity: newValue };
      dispatch(removeOrderItemAction(itemId));
      dispatch(addOrderItemAction(newOrderItems[orderItemIndex].id, newOrderItems[orderItemIndex].name, newValue));
      newInventory[inventoryItemIndex] = { ...inventoryItem, quantity: inventoryItem.quantity + prevValue - newValue };
    } else {
      newOrderItems.push({ id: itemId, name: inventoryItem.name, quantity: newValue });
      dispatch(addOrderItemAction(itemId, inventoryItem.name, newValue));
      newInventory[inventoryItemIndex] = { ...inventoryItem, quantity: inventoryItem.quantity - newValue };
    }



    setOrderItems(newOrderItems);
    setInitialInventory(newInventory);

    console.log('Current store state:', store.getState());
  }




  function toggleButtons(id) {
    setShowButtons({ ...showButtons, [id]: !showButtons[id] });
  }

  return (
    <Box p={4}>
      <Heading p={4}>Available Items</Heading>
      <VStack spacing="4">
        <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
          {inventory.map(item => (
            <GridItem key={item.id}>
              <Box p={4} borderWidth="1px" borderRadius="lg" minH="200" w="100%">
                <VStack alignItems="center">
                  <Heading size="md" mb={2}>{item.name}</Heading>
                  <Image src={logo} />
                  <Box mt={2}>Available: {inventory.find(invItem => invItem.id === item.id)?.quantity ?? 0} lbs</Box>
                  <Box ml={4} mb={4}>Expiry Date: {new Date(item.expiryDate).toLocaleDateString()}</Box>
                  <VStack spacing="4">
                    {
                      showButtons[item.id] ? (
                        <>
                          <HStack>
                          <Input
                            type="number"
                            min="0"
                            step="50"
                            value={inputValues[item.id] || ''}
                            onChange={(event) => handleQuantityChange(item.id, event)}
                            size="sm"
                            width="100px"
                          />
                          <Button
                        onClick={() => {
                          addToOrder(item);
                          setShowButtons((prevShowButtons) => {
                            return { ...prevShowButtons, [item.id]: true };
                          });
                        }}
                        colorScheme="orange"
                        ml={2}
                      >
                        Add to Order
                      </Button>
                    </HStack>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setShowButtons({ ...showButtons, [item.id]: true });
                    }}
                    colorScheme="orange"
                    ml={2}
                  >
                    Add to Order
                  </Button>
                )
              }

                </VStack>
              </VStack>
            </Box>
            </GridItem>
          ))}
      </Grid>
    </VStack>
    </Box >
  );
}

export default Inventory;