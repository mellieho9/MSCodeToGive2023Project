import React, { useState } from "react";
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
import "../css/Table.css"

function Delivery2() {
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [deliveries, setDeliveries] = useState([
        {
            id: 1,
            order: "Pizza, Cookies, and Salad",
            status: "Pending",
            location: { lat: 37.7749, lng: -122.4194 },
            eta: null,
        },
        {
            id: 2,
            order: "Burger, Fries, and Soda",
            status: "In Transit",
            location: { lat: 37.7749, lng: -122.4194 },
            eta: "10 mins",
        },
        {
            id: 3,
            order: "Sushi, Ramen, and Miso Soup",
            status: "Delivered",
            location: { lat: 37.7749, lng: -122.4194 },
            eta: null,
        },
    ]);
    const getProgress = (status) => {
        switch (status) {
            case "Pending":
                return 25;
            case "In Transit":
                return 50;
            case "Delivered":
                return 100;
            default:
                return 0;
        }
    };
    const progress = selectedDelivery ? getProgress(selectedDelivery.status) : 0;
    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "orange";
            case "In Transit":
                return "blue";
            case "Delivered":
                return "green";
            default:
                return "gray";
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
                                <Th>Estimated Time of Arrival</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {deliveries.map((delivery) => (
                                <Tr key={delivery.id}
                                    onClick={() => setSelectedDelivery(delivery)}>
                                    <Td>{delivery.id}</Td>
                                    <Td>{delivery.order}</Td>
                                    <Td>
                                        <Flex alignItems="center">
                                            {delivery.status === "Pending" && (
                                                <Text
                                                    mr="2"
                                                    fontSize="md"
                                                    fontWeight="bold"
                                                    color={getStatusColor(delivery.status)}
                                                >
                                                    <FaShippingFast />
                                                    {delivery.status}
                                                </Text>

                                            )}
                                            {delivery.status === "In Transit" && (
                                                <Text
                                                    mr="2"
                                                    fontSize="md"
                                                    fontWeight="bold"
                                                    color={getStatusColor(delivery.status)}
                                                >
                                                    <FaTruck />
                                                    {delivery.status}
                                                </Text>
                                            )}
                                            {delivery.status === "Delivered" && (
                                                <Text
                                                    mr="2"
                                                    fontSize="md"
                                                    fontWeight="bold"
                                                    color="green.500"
                                                >
                                                    <FaCheck />
                                                    {delivery.status}
                                                </Text>
                                            )}
                                        </Flex>
                                    </Td>
                                    <Td>{delivery.eta}</Td>
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
                                    <Text fontSize="2xl" fontWeight="semibold">{selectedDelivery.status}</Text>
                                    <Text fontSize="lg" fontWeight="light">{selectedDelivery.eta ? `ETA: ${selectedDelivery.eta}` : "No estimated time of arrival"}</Text>
                                </Box>
                                <Map delivery={selectedDelivery} />
                            </VStack>
                        </Box>}
                </VStack>

            </Box>

        </div>
    );
}

export default Delivery2;