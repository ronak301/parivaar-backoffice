/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box
} from '@chakra-ui/react';
import { z } from 'zod';
import { getFirebaseAppRemoteConfig } from '../../firebase';

import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import formImg from '../../assets/Component.png';
import { Button } from '@chakra-ui/react';

import { Select } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

const Form = ({ isOpen, onClose }) => {
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;

    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
  };

  const schema = z.object({
    name: z.string().min(3, { message: 'name must be at least 3 characters' }),
    Description: z.string().min(5, { message: 'minimum 5 word of description is needed' }),
    Type: z.string(),
    SubType: z.string()
  });
  type ValidationSchemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,

    watch,
    formState: { errors }
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema)
  });
  function onSubmit(values) {
    console.log(values);
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

  const [typeSubtypes, setTypeSubtypes] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    console.log('hu');
    console.log(watch('Type'));

  }, [watch('Type')]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const configData = (await getFirebaseAppRemoteConfig()) as ConfigData;

        if (configData && Array.isArray(configData.CommunityTypes)) {
          const typeSubtypesObj: { [key: string]: string[] } = {};

          configData.CommunityTypes.forEach((type) => {
            const subtypes = type.subTypes?.map((subtype) => subtype.id) || [];
            typeSubtypesObj[type.id] = subtypes;
          });

          console.log(typeSubtypesObj);
          setTypeSubtypes(typeSubtypesObj);
        } else {
          console.error('Invalid or missing data structure in configData.');
        }
      } catch (error) {
        console.error('Error fetching remote config:', error);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   console.log(typeSubtypes[getValues('Type')]);
  // }, [getValues('Type')]);

  const size = 'md';
  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="3xl" fontFamily={'Arial'}>
            Add Community
          </DrawerHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              <Box width={'200px'} position={'relative'} onClick={handleClick}>
                <FormLabel fontSize={'18px'}>Logo</FormLabel>
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={previewImage ? previewImage : formImg}
                  alt="Dan Abramov"></Image>
                <Input
                  type="file"
                  accept="image/*"
                  display={'none'}
                  ref={fileRef}
                  onChange={handleImageChange}
                />
                <Box
                  position={'absolute'}
                  right={'60px'}
                  backgroundColor={'#0777FF'}
                  opacity={'0.9'}
                  color={'white'}
                  width={'25px'}
                  height={'25px'}
                  borderRadius={'full'}
                  top={'140px'}>
                  <AddIcon position={'absolute'} right={1} top={1} />
                </Box>
              </Box>
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
              <FormControl isRequired mb={8} isInvalid={!!errors.Description ?? false}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  borderRadius={'4px'}
                  border={'0.6px solid #F0F0F0'}
                  background={'#F5F7F9'}
                  {...register('Description', { required: true })}></Input>
                <FormErrorMessage>
                  {errors.Description && errors.Description.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb={8}>
                <FormLabel>Type</FormLabel>
                <Select
                  borderRadius={'4px'}
                  border={'0.6px solid #F0F0F0'}
                  background={'#F5F7F9'}
                  {...register('Type', { required: true })}>
                  {typeSubtypes &&
                    Object.keys(typeSubtypes).map((type) => <option key={type}>{type}</option>)}
                </Select>
              </FormControl>
              <FormControl mb={8}>
                <FormLabel>Sub Type</FormLabel>
                <Select
                  borderRadius={'4px'}
                  border={'0.6px solid #F0F0F0'}
                  background={'#F5F7F9'}
                  {...register('SubType', { required: true })}>
                  {typeSubtypes[watch('Type')] &&
                    typeSubtypes[watch('Type')]?.map((subtype) => (
                      <option key={subtype}>{subtype}</option>
                    ))}
                </Select>
              </FormControl>
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

export default Form;
