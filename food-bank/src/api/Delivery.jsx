import React, { useState, useEffect } from "react";
import { Button, Heading, List, ListItem, Text } from "@chakra-ui/react";
import Map from "./Map";
// import { getDeliveries, updateDeliveryStatus } from "./Delivery";

function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  /*
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
  */
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin=""
      />
      <Heading as="h1" size="xl">
        Delivery Status
      </Heading>
      <Map deliveries={deliveries} />
      <List>
        {deliveries.map((delivery) => (
          <ListItem key={delivery.id}>
            <Text>Delivery ID: {delivery.id}</Text>
            <Text>Status: {delivery.status}</Text>
            <Button
              colorScheme="orange"
            /* onClick={() => handleDeliveryUpdate(delivery.id, "in transit")}*/
            >
              Mark as In Transit
            </Button>
            <Button
              colorScheme="green"
            /*onClick={() => handleDeliveryUpdate(delivery.id, "delivered")}*/
            >
              Mark as Delivered
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Delivery;