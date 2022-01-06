import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TRIP } from '../utils/mutations';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Flex
} from '@chakra-ui/react';

import {
    Input,
    FormControl,
    FormLabel,
    Menu,
    MenuOptionGroup,
    MenuList,
    MenuItemOption,
    MenuButton
} from '@chakra-ui/react';

import {QUERY_ME} from '../utils/queries';

function FriendsMenu({handleChange, friends}){

    return(
        <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='blue' minWidth="100%">
                Select your companions
            </MenuButton>
            <MenuList>
                <MenuOptionGroup title='Companions' type='checkbox'>
                    {/* map over your friends here and create a menuItemOption for each one */}
                    {friends.map((friend, index) => (
                        <MenuItemOption value={friend.username} key={index} onClick={handleChange}>{friend.username}</MenuItemOption>
                    ))}
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
}


// connect this form to the addTrip mutation
// when the button is pressed the graphql mutation is used
function TripForm({handleChange, friends}){
    return(
        <Flex direction="column">
            <FormControl isRequired={true} pb={1}>
                <FormLabel htmlFor='tripname'>Trip Name</FormLabel>
                <Input id='tripname' type='text' name='tripName' onChange={handleChange}/>
            </FormControl>

            <FormControl isRequired={true} pb={1}>
                <FormLabel htmlFor='tripdesc'>Trip Description</FormLabel>
                <Input id='tripdesc' type='text' name='tripDetails' onChange={handleChange}/>
            </FormControl>

            <FormControl pb={1}>
                <FormLabel htmlFor='tripcomp'>Trip Companions</FormLabel>
                <FriendsMenu handleChange={handleChange}
                friends={friends}/>
            </FormControl>

            <FormControl isRequired={true} pb={1}>
                <FormLabel htmlFor='tripdest'>Trip Destination</FormLabel>
                <Input id='tripdest' type='text' name='tripDestination' onChange={handleChange}/>
            </FormControl>

            <Flex pb={1}>
                <FormControl isRequired={true}>
                    <FormLabel htmlFor='tripstart'>Trip Start Date</FormLabel>
                    <Input id='tripstart' type='date' name="tripDeparture" onChange={handleChange}/>
                </FormControl>

                <FormControl isRequired={true}>
                    <FormLabel htmlFor='tripend'>Trip End Date</FormLabel>
                    <Input id='tripend' type='date' name="tripReturn" onChange={handleChange}/>
                </FormControl>
            </Flex>
        </Flex>
    );
}

function TripModal({friends}){
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [addTrip] = useMutation(ADD_TRIP);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addTrip({
            variables: { ...formState },
            refetchQueries: () => [{query:QUERY_ME}]
            });
            onClose();
        } catch (e) {
            console.error(e);
        }
    }

    const [formState, setFormState] = useState({
        tripName: '',
        tripDetails: '',
        tripDestination: '',
        tripCoordinates: '',
        tripDeparture: '',
        tripReturn: '',
        tripCompanions: []
    });

    const handleChange = (event) => {
        const{ name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
        console.log(formState);
    };

    return (
        <>
        <Button onClick={onOpen}>Create a new Trip</Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">New Trip Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TripForm friends={friends}
                        handleChange={handleChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleFormSubmit}>Create Trip</Button>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default TripModal;