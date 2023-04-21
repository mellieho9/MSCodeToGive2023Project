import React, { useState, useEffect } from 'react';
import Map from './Map';
import { getDeliveries, updateDeliveryStatus } from './Delivery';

function Delivery() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    // Fetch the list of deliveries from the server on component mount
    const fetchDeliveries = async () => {
      const response = await getDeliveries();
      setDeliveries(response);
    };
    fetchDeliveries();
  }, []);

  const handleDeliveryUpdate = async (deliveryId, status) => {
    // Update the delivery status on the server and refresh the list of deliveries
    await updateDeliveryStatus(deliveryId, status);
    const response = await getDeliveries();
    setDeliveries(response);
  };

  return (
    <div>
      <h1>Delivery Status</h1>
      <Map deliveries={deliveries} />
      <ul>
        {deliveries.map((delivery) => (
          <li key={delivery.id}>
            <div>Delivery ID: {delivery.id}</div>
            <div>Status: {delivery.status}</div>
            <button onClick={() => handleDeliveryUpdate(delivery.id, 'in transit')}>
              Mark as In Transit
            </button>
            <button onClick={() => handleDeliveryUpdate(delivery.id, 'delivered')}>
              Mark as Delivered
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Delivery;
