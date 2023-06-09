import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Heading,
    Text,
    Flex,
    HStack,
    Input,
    Button,
    Progress
} from "@chakra-ui/react";
import { FaTruck, FaShippingFast, FaCheck } from "react-icons/fa";
import Map from "./Map";
import Map2 from "./Map2";
import Map3 from "./Map3";
import "../css/Table.css"

function Delivery2() {
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [deliveries, setDeliveries] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/databases/orders/1")
          .then((response) => response.json())
          .then((data) => setDeliveries(data));
      }, []);
    const getProgress = (status) => {
        switch (status) {
            case "pending":
                return 25;
            case "in transit":
                return 50;
            case "delivered":
                return 100;
            default:
                return 0;
        }
    };
    const progress = selectedDelivery ? getProgress(selectedDelivery.status) : 0;
    const getETA = (status) => {
        switch (status) {
            case "pending":
                return "1 week";
            case "in transit":
                return "2 days";
            case "delivered":
                return "Already arrived";
            default:
                return "";
        }
    };

    const handleGetLocation = () => {
        // Replace this with your code to get the delivery location based on the user's input
        const newDeliveries = [...deliveries];
        newDeliveries[0].location = { lat: 37.7749, lng: -122.4194 };
        setDeliveries(newDeliveries);
    };

    return (
        <div>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                crossorigin=""
            />
            <Box p={4}>
                <Heading py={4} as="h1" size="xl">
                    Delivery Status
                </Heading>
                <VStack align="stretch" spacing={4}>
                    <HStack>
                        <Input placeholder="Enter Order ID" />
                        <Button colorScheme="orange" onClick={handleGetLocation}>
                            Track order
                        </Button>
                    </HStack>
                    <Table variant="simple">
                        <Thead>
                            <Tr >
                                <Th>ID</Th>
                                <Th>Order</Th>
                                <Th>Status</Th>
                                <Th>Estimated Time Of Arrival</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {deliveries.slice(0, deliveries.length/2).map((delivery) => (
                                <Tr key={delivery['order_id']}
                                    onClick={() => setSelectedDelivery(delivery)}>
                                    <Td>{delivery['order_id']}</Td>
                                    <Td>{Object.values(delivery['item_quantity_dict']).map((item) => item["name"]).join(', ')}</Td>
                                    <Td>
                                        <Flex alignItems="center">
                                            {delivery['order_status'] === "pending" && (
                                                <Text
                                                    mr="2"
                                                    fontSize="md"
                                                    fontWeight="bold"
                                                    color={"orange.300"}
                                                >
                                                    <FaShippingFast />
                                                    {delivery['order_status']}
                                                </Text>

                                            )}
                                            {delivery['order_status'] === "in transit" && (
                                                <Text
                                                    mr="2"
                                                    fontSize="md"
                                                    fontWeight="bold"
                                                    color={"blue.400"}
                                                >
                                                    <FaTruck />
                                                    {delivery['order_status']}
                                                </Text>
                                            )}
                                            {delivery['order_status'] === "delivered" && (
                                                <Text
                                                    mr="2"
                                                    fontSize="md"
                                                    fontWeight="bold"
                                                    color="green.500"
                                                >
                                                    <FaCheck />
                                                    {delivery["order_status"].charAt(0).toUpperCase() + delivery["order_status"].slice(1)}
                                                </Text>
                                            )}
                                        </Flex>
                                    </Td>
                                    <Td>{getETA(delivery["order_status"])}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {selectedDelivery &&
                        <Box
                            spacing={5}
                            borderRadius="md"
                            bg="gray.100"
                            p={5}
                        >

                            <Progress
                                value={progress}
                                colorScheme="orange"
                                size="lg"
                                isAnimated={true}
                                hasStripe={true}
                                rounded="md"
                                bg="white"
                            />
                            <VStack py={4} spacing={5} >
                                <HStack width="100%" justifyContent="space-between">
                                    <FaShippingFast />
                                    <FaTruck />
                                    <FaCheck />
                                </HStack>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Text fontSize="2xl" fontWeight="semibold">{selectedDelivery["order_status"].charAt(0).toUpperCase() + selectedDelivery["order_status"].slice(1)}
</Text>
                                    <Text fontSize="lg" fontWeight="light">{getETA(selectedDelivery["order_status"]) ? `ETA: ${getETA(selectedDelivery["order_status"])}` : "No estimated time of arrival"}</Text>
                                </Box>
                                
                                {selectedDelivery["order_status"] === "delivered" && <Map delivery={selectedDelivery} />}
                                {selectedDelivery["order_status"] === "in transit" && <Map3 delivery={selectedDelivery} />}
                                {selectedDelivery["order_status"] === "pending" && <Map2 delivery={selectedDelivery} />}




                            </VStack>
                        </Box>}
                </VStack>

            </Box>

        </div>
    );
}

export default Delivery2;