/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Divider,
  Spacer,
  Flex,
  Text,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const CreateUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const [isMember, setIsMember] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  let userId = '';
  let pnumber = '';
  const onSubmit = async (data) => {
    pnumber = data.phoneNumber;
    try {
      const response = await axios.post(`https://api.parivaarapp.in/community/members/${id}`, {
        query: pnumber,
        filter: {},
        skip: 0,
        limit: 10
      });

      console.log('hi');
      const responseData = response.data;
      console.log(responseData);
      userId = responseData.members.count > 0 ? responseData.members.rows[0].userId : '';
      console.log('user id is ', userId);
      console.log(responseData);

      if (responseData.success) {
        setIsMember(responseData.members.count > 0);
        setSubmitSuccess(true);
      } else {
        console.error('Error fetching member data:', responseData.error);
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
    console.log(pnumber);
    console.log(isMember);
    console.log(submitSuccess);
  };

  useEffect(() => {
    if (!isMember && submitSuccess) {
      const data = { phoneNumber: pnumber };
      navigate(`/invite/${id}/member`, { state: { phoneNumber: pnumber } });
    }
  }, [submitSuccess]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" mt={20}>
      {!submitSuccess ? (
        <Box
          p={4}
          maxW="xl"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          width={['90%', '80%', '60%']}
          mx="auto">
          <Box textAlign="center">
            <Heading size="lg">Add User To Community </Heading>
            <Text mt={2} color="gray.500">
              Enter your details
            </Text>
          </Box>
          <Divider my={5} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired mt={10}>
              <FormLabel>Username</FormLabel>
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
              <FormLabel>Phone Number</FormLabel>
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
              <Button colorScheme="blue" width="20%" mt={10} type="submit">
                Add
              </Button>
            </Box>
          </form>

          <Spacer />
        </Box>
      ) : isMember ? (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          mt={5}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            width={'fit-content'}
            height="200px">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={5} mb={1} fontSize="lg">
              User already in the community!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              This user is already a member of the community.
            </AlertDescription>
          </Alert>
        </Box>
      ) : null}
    </Box>
  );
};

export default CreateUser;
