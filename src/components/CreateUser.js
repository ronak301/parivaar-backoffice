import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Divider,
  Spacer,
  Text
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import ProfileCard from './ProfileCard';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const CreateUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [userId, setuserId] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const onSubmit = async (data) => {
    setLoading(true);
    let pnumber = data.phoneNumber;
    try {
      const response = await axios.post(`https://api.parivaarapp.in/community/members/${id}`, {
        query: pnumber,
        filter: {},
        skip: 0,
        limit: 10
      });
      if (response) {
        setuserId(response.data.members.count > 0 ? response.data.members.rows[0].id : null);
      }
      console.log('hi');

      if (response.data) {
        const responseData = response.data;
        console.log(responseData);
        if (responseData.members.count > 0) {
          onOpen();
        } else {
          console.log('hi');
          navigate(`/invite/${id}/member`);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  return (
    <>
      {!loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Box
            p={4}
            maxW="xl"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            width={['90%', '80%', '60%']}
            mx="auto">
            <Box textAlign="center">
              <Heading size={['md', 'lg', 'xl']}>Add User To Community </Heading>
              <Text mt={2} color="gray.500" fontSize={['sm', 'md', 'lg']}>
                Enter your details
              </Text>
            </Box>
            <Divider my={5} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired mt={10}>
                <FormLabel fontSize={['sm', 'md', 'lg']}>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters'
                    }
                  })}
                />
                <span style={{ color: 'red' }}>{errors.username?.message}</span>
              </FormControl>
              <FormControl mt={10} isRequired>
                <FormLabel fontSize={['sm', 'md', 'lg']}>Phone Number</FormLabel>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Invalid phone number'
                    }
                  })}
                />
                <span style={{ color: 'red' }}>{errors.phoneNumber?.message}</span>
              </FormControl>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Button colorScheme="blue" mt={10} width={['80%', '60%', '40%']} type="submit">
                  Add
                </Button>
              </Box>
            </form>

            <Spacer />
          </Box>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize={['md', 'lg', 'xl']} color={'black'}>
                Already the member of this community
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text color={'black'} fontWeight={'100'} fontSize={['sm', 'md', 'lg']}>
                  Please Try Again with other phone number
                </Text>
                <Box mt={10}>
                  {userId && <ProfileCard uid={userId} fontSize={['sm', 'md', 'lg']} />}
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Ok</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      ) : (
        <>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        </>
      )}
    </>
  );
};

export default CreateUser;
