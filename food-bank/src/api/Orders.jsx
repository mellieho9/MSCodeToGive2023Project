import React, { useState } from 'react';

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
    <div>
      <h1>Orders</h1>
      <form onSubmit={handleAddOrder}>
        <label>
          Food Item:
          <input
            type="text"
            name="foodItem"
            value={newOrder.foodItem}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={newOrder.status}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Order</button>
      </form>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            {order.foodItem} - {order.quantity} - {order.status}
            <button onClick={() => handleDeleteOrder(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
