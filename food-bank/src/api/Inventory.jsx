import { useState } from 'react';

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
    <div>
      <h2>Inventory</h2>
      <ul>
        {inventory.map(item => (
          <li key={item.id}>
            {item.name}: {item.quantity}
            <button onClick={() => removeFoodItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={event => {
        event.preventDefault();
        const id = inventory[inventory.length - 1].id + 1;
        const name = event.target.elements.name.value;
        const quantity = Number(event.target.elements.quantity.value);
        addFoodItem({ id, name, quantity });
        event.target.reset();
      }}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" required />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default Inventory;
