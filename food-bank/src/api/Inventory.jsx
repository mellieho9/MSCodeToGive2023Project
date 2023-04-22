import { useState } from 'react';
import { VStack, HStack, Button, Input, FormControl, FormLabel, Table, Thead, Tbody, Tr, Th, Td, Box, Heading } from '@chakra-ui/react';

const initialInventory = [
  { id: 1, name: 'Apples', quantity: 50 },
  { id: 2, name: 'Oranges', quantity: 25 },
  { id: 3, name: 'Bananas', quantity: 40 }
];

function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);

  function addFoodItem(item) {
    setInventory([...inventory, item]);
  }

  function removeFoodItem(id) {
    setInventory(inventory.filter(item => item.id !== id));
  }

  function updateFoodItem(id, quantity) {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      } else {
        return item;
      }
    }));
  }

  return (
    <Box p={4}>
      <Heading py={4}>Inventory</Heading>
      <VStack spacing="4">
        <form onSubmit={event => {
          event.preventDefault();
          const id = inventory[inventory.length - 1].id + 1;
          const name = event.target.elements.name.value;
          const quantity = Number(event.target.elements.quantity.value);
          addFoodItem({ id, name, quantity });
          event.target.reset();
        }} style={{ width: "100%" }}>
          <HStack spacing="8" w="100%" alignItems="end">
            <FormControl isRequired flex="1">
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" />
            </FormControl>
            <FormControl isRequired flex="1">
              <FormLabel>Quantity</FormLabel>
              <Input type="number" name="quantity" />
            </FormControl>
            <Button flexShrink="0" type="submit" ml="auto" colorScheme="orange">
              Add Item
            </Button>
          </HStack>
        </form>
        <Box w="100%">
          <Table>
            <Thead>
              <Tr>
                <Th>Food Item</Th>
                <Th>Quantity</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {inventory.map(item => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>
                    <Button onClick={() => removeFoodItem(item.id)}>Remove</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>

  );
}

export default Inventory;