import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';

function PartnerInfo({isDrawerOpen, onClose}) {

    const [partnerData, setPartnerData] = useState({});
    const [editing, setEditing] = useState(false);
    
      useEffect( async () => {
        axios.get(`http://localhost:3000/databases/get_user_from_email/hey@gmail.com`)
          .then(response => {
            setPartnerData(response.data);
            console.log(partnerData)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      const handleInputChange = (event) => {
        setPartnerData({
            ...partnerData,
            [event.target.name]: event.target.value,
        });
    };

      const handleEditClick = () => {
        setEditing(true);
      };
    
      const handleCancelClick = () => {
        setEditing(false);
      };
    
      const handleLocationSelect = (place) => {
        setPartnerData({
          ...partnerData,
          PartnerLocation: place.formatted_address,
        });
      };

      const handleSaveClick = () => {
        // Prepare the updated data
        const updatedData = {
            company_name: partnerData["company_name"],
            location: partnerData["location"],
            time_from: partnerData["time_from"],
            time_to: partnerData["time_to"],
            refrigeration_capacity: partnerData["refrigeration_capacity"]
        };
    
        // Send a PUT request to update the user data
        fetch(`http://localhost:3000/databases/update_user_from_email/hey@gmail.com`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setEditing(false);
        })
        .catch(error => console.error(error));
    };

    return (
        <>
        {
            <Drawer isOpen={isDrawerOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={onClose} />
                    <DrawerHeader>{partnerData["company_name"]}</DrawerHeader>
                    <DrawerBody>
                        <VStack align="stretch" spacing="4">
                            <FormControl>
                                <FormLabel>Partner Location:</FormLabel>
                                {editing ? (
                                    <Input
                                        type="text"
                                        name="PartnerLocation"
                                        value={partnerData["location"]}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Box>{partnerData["location"]}</Box>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Availability Time (From):</FormLabel>
                                {editing ? (
                                    <Input
                                        type="text"
                                        name="AvailabilityTimeFrom"
                                        value={partnerData["time_from"]}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Box>{partnerData["time_from"]}</Box>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Availability Time (To):</FormLabel>
                                {editing ? (
                                    <Input
                                        type="text"
                                        name="AvailabilityTimeTo"
                                        value={partnerData["time_to"]}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Box>{partnerData["time_to"]}</Box>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Refrigeration Capacity:</FormLabel>
                                {editing ? (
                                    <Input
                                        type="number"
                                        name="RefrigerationCapacity"
                                        value={partnerData["refrigeration_capacity"]}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Box>{partnerData["refrigeration_capacity"]}</Box>
                                )}
                            </FormControl>
                            <FormControl>
                                {editing ? (
                                    <Box>
                                        <Button colorScheme="orange" onClick={handleSaveClick}>
                                            Save
                                        </Button>
                                        <Button colorScheme="orange" variant="outline" ml="4" onClick={handleCancelClick}>
                                            Cancel
                                        </Button>
                                    </Box>
                                ) : (
                                    <Button colorScheme="orange" onClick={handleEditClick}>
                                        Edit
                                    </Button>
                                )}
                            </FormControl>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        }
        </>
    );
}

export default PartnerInfo;