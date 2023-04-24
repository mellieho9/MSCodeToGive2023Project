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

    const [partnerData, setPartnerData] = useState(null);
    const [editing, setEditing] = useState(false);

    const [data, setData] = useState({ email: '', name: '' });
    useEffect( async () => {
        axios.get('http://localhost:3000/databases/currentUser')
          .then(response => {
            setData(response.data);
            console.log(data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    
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
        // TODO: update partner data in database
        setEditing(false);
    };

    return (
        <>
        {/*
            <Drawer isOpen={isDrawerOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={onClose} />
                    <DrawerHeader>{partnerData.PartnerName}</DrawerHeader>
                    <DrawerBody>
                        <VStack align="stretch" spacing="4">
                            <FormControl>
                                <FormLabel>Partner Location:</FormLabel>
                                {editing ? (
                                    <Input
                                        type="text"
                                        name="PartnerLocation"
                                        value={partnerData.PartnerLocation}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Box>{partnerData.PartnerLocation}</Box>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Availability Time (From):</FormLabel>
                                {editing ? (
                                    <Input
                                        type="datetime-local"
                                        name="AvailabilityTimeFrom"
                                        value={partnerData.AvailabilityTimeFrom}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Box>{partnerData.AvailabilityTimeFrom}</Box>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Refrigeration Capacity:</FormLabel>
                                {editing ? (
                                    <Input
                                        type="number"
                                        name="RefrigerationCapacity"
                                        value={partnerData.RefrigerationCapacity}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Box>{partnerData.RefrigerationCapacity}</Box>
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
        */}
        </>
    );
}

export default PartnerInfo;