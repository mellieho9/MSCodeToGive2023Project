import React, { useState } from 'react';
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
    // sample partner data
    const initialPartnerData = {
        PartnerId: 1,
        PartnerName: 'John Doe',
        PartnerLocation: '123 Main St, Anytown, USA',
        AvailabilityTimeFrom: '2023-05-01T09:00:00Z',
        AvailabilityTimeTo: '2023-05-01T17:00:00Z',
        RefrigerationCapacity: 500,
    };

    const [partnerData, setPartnerData] = useState(initialPartnerData);
    const [editing, setEditing] = useState(false);

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
        setPartnerData(initialPartnerData);
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
        </>
    );
}

export default PartnerInfo;