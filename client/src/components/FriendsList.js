import React from "react";
import { Table, Thead, Tbody, Tfoot, Th, Tr, Td, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Tag, TagLabel, Avatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

function FriendsModal({ friends }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>View Entire Tribe</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tribe Members</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {friends.map(friend => (
                            <Link to={`/user/${friend.username}`} key={friend._id}><p>{friend.username}</p></Link>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function FriendsList({ user }) {
    const { friends, username, companionCount } = user;

    return (
        <Table justify-content="center" variant="unstyled" maxHeight="75vh">
            <Thead>
                <Tr>
                    <Th background="primary.400" borderTopRadius="md" height="2rem" fontSize="sm" color="white" textAlign="center">{username}'s Tribe ({companionCount})</Th>
                </Tr>
            </Thead>
            <Tbody backgroundColor="gray.100">
                {friends.length > 0 ? friends.map(friend => (
                    <Tr key={friend._id}>
                        <Td textAlign="center">
                            <Tag as={Link} to={`/user/${friend.username}`} size='lg' colorScheme='black' borderRadius='full'>
                                <Avatar
                                    //eventually we will have users add their own pictures if they so please
                                    src="https://ccpm.ie/wp-content/uploads/2021/03/placeholder.png"
                                    size='md'
                                    name={friend.username}
                                    ml={-3}
                                    mr={2}
                                />
                                <TagLabel>{friend.username}</TagLabel>
                            </Tag>
                        </Td>
                    </Tr>
                )) : <Tr></Tr>
                }
            </Tbody>
            {/* only display the button to access the friends modal if the user has more than 5 friends */}
            {companionCount > 5 ? (
                <Tfoot>
                    <Tr>
                        <Th textAlign="center">
                            <FriendsModal friends={friends} />
                        </Th>
                    </Tr>
                </Tfoot>
            ) : <></>}
        </Table>
    );
}

export default FriendsList;