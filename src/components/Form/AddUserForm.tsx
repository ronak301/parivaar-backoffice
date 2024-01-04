/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {useRef, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  // Alert,
  // AlertIcon,
  // AlertTitle,
  // AlertDescription
} from '@chakra-ui/react';

import { z } from 'zod';

import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';

import { Select } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import formImg from '../../assets/user.jpg';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

const AddUserForm = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;

    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
  };
  const schema = z.object({
    name: z.string().refine((val) => val.length >= 3, {
      message: 'Name must be at least 3 characters'
    }),
    lastName: z.string(),
    dob: z.string(),
    phoneNumber: z.string(),
    bgrp: z.string(),
    gender: z.string(),
    gName: z.string(),
    NativePlace: z.string(),
    wDate: z.string(),
    email: z.string().email(),
    education: z.string(),
    address: z.string(),
    pincode: z.string(),
    city: z.string(),
    state: z.string()
  });
  type ValidationSchemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema)
  });
  function onSubmit(values) {
    console.log(values);
    setLoading(true);
    if (loading) {
      console.log('h');
    }

    let success = true;
    if (success) {
      console.log('success');
      setLoading(false);
    }
  }
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef.current && fileRef.current.click();
  };

  interface ConfigData {
    CommunityTypes?: {
      id: string;
      label: string;
      subTypes?: {
        id: string;
        label: string;
      }[];
    }[];
  }



  const size = 'md';
  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} size={size}>
        {/* <Alert status="success">
          <AlertIcon />
          <AlertTitle>Form Submitted succesfully</AlertTitle>
          <AlertDescription>Community created successfuly</AlertDescription>
        </Alert> */}
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="3xl" fontFamily={'Arial'}>
            Add Community
          </DrawerHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              <Box width={'300px'} position={'relative'} onClick={handleClick}>
                <FormLabel textAlign={'left'} fontSize={'18px'}>
                  Logo
                </FormLabel>
                <Image
                  borderRadius="full"
                  textAlign={'left'}
                  boxSize={200}
                  src={previewImage ? previewImage : formImg}
                />
                <Input
                  type="file"
                  accept="image/*"
                  display={'none'}
                  ref={fileRef}
                  onChange={handleImageChange}
                />
                <Box
                  position={'absolute'}
                  right={'140px'}
                  backgroundColor={'#0777FF'}
                  opacity={'0.9'}
                  color={'white'}
                  width={'25px'}
                  height={'25px'}
                  borderRadius={'full'}
                  top={'170px'}>
                  <AddIcon position={'absolute'} right={1} top={1} />
                </Box>
              </Box>
              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'} isInvalid={!!errors.name ?? false}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    type="text"
                    {...register('name', {
                      required: 'This is required'
                    })}
                  />
                  <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mb={8} mt={'40px'} isInvalid={!!errors.lastName ?? false}>
                  <FormLabel htmlFor="name">Last Name</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    type="text"
                    {...register('lastName', {
                      required: 'This is required'
                    })}
                  />
                  <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'} isInvalid={!!errors.dob ?? false}>
                  <FormLabel htmlFor="name">Date of Birth</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    type="text"
                    {...register('dob', {
                      required: 'This is required'
                    })}
                  />
                  <FormErrorMessage>{errors.dob && errors.dob.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mb={8} mt={'40px'} isInvalid={!!errors.lastName ?? false}>
                  <FormLabel htmlFor="name">Phone Number</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    type="text"
                    {...register('phoneNumber', {
                      required: 'This is required'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'} isInvalid={!!errors.name ?? false}>
                  <FormLabel htmlFor="name">Blood Group</FormLabel>
                  <Select
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('bgrp', {
                      required: 'This is required'
                    })}>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                  </Select>
                  <FormErrorMessage>{errors.bgrp && errors.bgrp.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mb={8} mt={'40px'} isInvalid={!!errors.name ?? false}>
                  <FormLabel htmlFor="name">Gender</FormLabel>
                  <Select
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('gender', {
                      required: 'This is required'
                    })}>
                    <option>Male</option>
                    <option>Female</option>
                  </Select>
                  <FormErrorMessage>{errors.bgrp && errors.bgrp.message}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'} isInvalid={!!errors.gName ?? false}>
                  <FormLabel htmlFor="name">Guardian Name</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('gName', {
                      required: 'This is required'
                    })}></Input>
                  <FormErrorMessage>{errors.gName && errors.gName.message}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'} isInvalid={!!errors.gName ?? false}>
                  <FormLabel htmlFor="name">Native Place</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('NativePlace', {
                      required: 'This is required'
                    })}></Input>
                </FormControl>
              </Box>

              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'}>
                  <FormLabel htmlFor="name">Wedding Date</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('wDate', {
                      required: 'This is required'
                    })}></Input>
                </FormControl>
              </Box>
              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'}>
                  <FormLabel htmlFor="name">Email</FormLabel>
                  <Input
                    type="email"
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('email', {
                      required: 'This is required'
                    })}></Input>
                </FormControl>
              </Box>
              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'}>
                  <FormLabel htmlFor="name">Education</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('education', {
                      required: 'This is required'
                    })}></Input>
                </FormControl>
              </Box>
              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'}>
                  <FormLabel htmlFor="name">Address</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('address', {
                      required: 'This is required'
                    })}></Input>
                </FormControl>
              </Box>

              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'}>
                  <FormLabel htmlFor="name">Pincode</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('pincode', {
                      required: 'This is required'
                    })}></Input>
                </FormControl>
              </Box>
              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'}>
                  <FormLabel htmlFor="name">City</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('city', {
                      required: 'This is required'
                    })}></Input>
                </FormControl>
              </Box>
              <Box style={{ display: 'flex', gap: '2rem' }}>
                <FormControl isRequired mb={8} mt={'40px'}>
                  <FormLabel htmlFor="name">State</FormLabel>
                  <Input
                    borderRadius={'4px'}
                    border={'0.6px solid #F0F0F0'}
                    background={'#F5F7F9'}
                    {...register('state', {
                      required: 'This is required'
                    })}></Input>
                </FormControl>
              </Box>
            </DrawerBody>

            <DrawerFooter justifyContent={'center'}>
              <Button
                size={'2xl'}
                type="submit"
                borderRadius={'25px'}
                justifyContent={'center'}
                alignItems={'center'}
                backgroundColor={'#0777FF'}
                border={'1px solid  #0777FF'}
                colorScheme="#FBFBFB"
                display={'flex'}
                padding={'14px 135px 15px 135px'}>
                + Add Community
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddUserForm;
