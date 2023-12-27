/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { DatePicker, Stack } from 'rsuite';
import { useLocation, useParams } from 'react-router-dom';
import 'rsuite/dist/rsuite.css';
import { Image, Text } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Select, useDisclosure } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import Details from "./Details.js";

import {
  Textarea,
  Button,
  FormErrorMessage,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton
} from '@chakra-ui/react';
import { Switch } from '@chakra-ui/react';
import { Form, useForm } from 'react-hook-form';
import { Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import CreateUser from './CreateUser';
import { Spinner } from '@chakra-ui/react';


const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [formValues,setFormValues] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const BloodGrp = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const Locality = ['Sindhi Bazaar', 'Kolpol'];
  const City = [
    'Mumbai',
    'Ahmedabad',
    'Surat',
    'Vadodara',
    'Rajkot',
    'Bharuch',
    'Jamnagar',
    'Gandhinagar',
    'Nadiad',
    'Palanpur',
    'Valsad',
    'Dahod',
    'Navsari',
    'Godhra',
    'Anand',
    'Bhavnaga',
    'Udaipur'
  ];
  const State = ['Rajasthan', 'Haryana'];
  const [isSwitchOn, setSwitchOn] = React.useState(false);
  const handleSwitchChange = () => {
    setSwitchOn(!isSwitchOn);
  };

  const CheckUser = async (phoneNumber) => {
    try {
      //  console.log("in check user",phoneNumber);

      const response = await axios.post('https://api.parivaarapp.in/user/search', {
        query: phoneNumber,
        filter: {
          parentNode: null
        },
        limit: 10000,
        skip: 0
      });
      // console.log(response.data.data);

      console.log('in check user', response.data.data.count);
      if (response.data.data.count > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getuserId = async (phoneNumber) => {
    console.log(phoneNumber);
    const result = await axios.post('https://api.parivaarapp.in/user/search', {
      query: phoneNumber,
      filter: {
        parentNode: null
      },
      limit: 10000,
      skip: 0
    });
    // console.log(result);
    return result.data.data.rows.length > 0 ? result.data.data.rows[0].id : '';
  };

  const createUser = async (firstName, lastName, phoneNumber) => {
    try {
      const res = await axios.post('https://api.parivaarapp.in/user/new', {
        firstName: firstName,
        lastName: lastName,
        parentNode: null,
        phone: phoneNumber
      });
      return res.data ? res.data.id : '';
    } catch (error) {
      console.log('error is', error);
    }
  };

  const JoinCommunity = async (userId) => {
    setLoading(true);
    try {
      console.log('in join ', userId);
      console.log('');
      const resj = await axios.post(`https://api.parivaarapp.in/community/join/${id}`, {
        userId: userId
      });
      console.log('in join community', resj.data);


    } catch (error) {
      console.log(error);
    }
    setSuccess(true);
    setLoading(false);
  };

  interface IFormInput {
    name: string;
    lastname: string;
    MobileNumber: string;
    DOB: string;
    weddingDate: string;
    gender: string;
    bloodGrp: string;
    gname: string;
    email: string;
    Education: string;
    Landline: string;
    NativePlace: string;
    FullAddress: string;
    City: string;
    State: string;
    Pincode: string;
    Locality: string;
    bname?: string;
    bType?: string;
    SubType?: string;
    website?: string;
    bphone?: string;
    baddress?: string;
    description?: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>();
  const [userId, setuserId] = useState('');
  const handleAddClick=()=>{
    window.location.reload();


  }
  const onSubmit = async (values) => {
    setFormValues(values);
    console.log(values.MobileNumber);
    const userExist = await CheckUser(values.MobileNumber);

    if (userExist) {
      setuserId(await getuserId(values.MobileNumber));
      onOpen();
      console.log('user exist');
      console.log(userId);
    } else {
      setLoading(true);
      let uid=await createUser(values.name,values.lastname,values.MobileNumber);
      await JoinCommunity(uid);
      setSuccess(true);
    }
  };

  const [imgurl, setImgurl] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [commDescription, setCommDescription] = useState('');

  useEffect(() => {
    const fetchCommun = async () => {
      const commun = await axios.get(`https://api.parivaarapp.in/community/${id}`);
      console.log('fethed commun deta');
      if (commun.data) {
        setImgurl(commun.data.logo);
        setCommunityName(commun.data.name);
        setCommDescription(commun.data.description);
      }
    };
    fetchCommun();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [dateValue,setDatevalue]=useState(null);
  const dateChange=(value,event)=>{
    setDatevalue(value);


    
  }

  return (
    <>
      {!loading ? (
        success ? (
          <>
            <Alert status="success" mt={4}>
              <AlertIcon />
              Form submitted successfully
            </Alert>
            <Details values={formValues}
            imgurl={imgurl}
            communityName={communityName}
            commDescription={commDescription}
            dateValue={dateValue} 
            
            />
            <Box
              position="relative"
              bottom="0"
              height={'20%'}
              width={'50%'}
              left="50%"
              transform="translateX(-50%)"
              mb="10"
              mt="5"
              p="4" 
              backgroundColor={'#dce5f2'}
              borderRadius="md"
              boxShadow="md"
              justifyContent={'center'}
              display="flex"
              alignItems="center">
              <Text color={'black'} fontSize={25} mr="4">Want to add more numbers?</Text>
              <Button
                colorScheme="teal" 
                onClick={handleAddClick}>
                ADD+
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box backgroundColor={'#e9f2ed'} pt={10} pb={10}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex
                  flexDirection={'column'}
                  gap={10}
                  width={'50%'}
                  pt={10}
                  pb={10}
                  justifyContent={'center'}
                  margin={'auto'}
                  backgroundColor="#ffffff"
                  // mt={10}
                  // mb={10}
                  borderRadius="8px"
                  boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                  padding={6}>
                  <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered>
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                      <AlertDialogHeader>User Exits</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                        User Already exist are you sure you want to join this community
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button onClick={onClose} ref={cancelRef}>
                          No
                        </Button>
                        <Button colorScheme="red" ml={3} onClick={() => JoinCommunity(userId)}>
                          Yes
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Box display={'flex'} flexDirection={'row'} gap={100} alignItems={'center'}>
                    <Image src={imgurl} width={'140px'} height={'140px'} />
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      gap={5}
                      justifyContent={'center'}>
                      <Text color="black" fontSize={'40'} fontWeight={'500'} lineHeight={1}>
                        {communityName}
                      </Text>

                      <Text width={'350px'} color={'black'} lineHeight={2}>
                        {commDescription}
                      </Text>
                    </Box>
                  </Box>

                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input {...register('name')} type="name" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="name" {...register('lastname')} />
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.MobileNumber ?? false}>
                    <FormLabel>Mobile Number</FormLabel>
                    <Input
                      isRequired
                      type="tel"
                      {...register('MobileNumber', {
                        pattern: {
                          value: /^\d{10}$/,
                          message: 'Please enter a valid 10-digit phone number'
                        }
                      })}
                    />
                    <FormErrorMessage>
                      {errors.MobileNumber && errors.MobileNumber.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl {...register('DOB')}>
                    <FormLabel>Date of Birth</FormLabel>
                    <Stack direction="column" alignItems="flex-start" spacing={6}>
                      <DatePicker format="MM/dd/yyyy" value={dateValue} onChange={dateChange} />
                    </Stack>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Select placeholder="Select option" {...register('gender')}>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Blood Group</FormLabel>
                    <Select placeholder="Select option" {...register('bloodGrp')}>
                      {BloodGrp &&
                        BloodGrp.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Guardian Name</FormLabel>
                    <Input type="name" {...register('gname')} />
                  </FormControl>
                  <FormControl {...register('weddingDate')}>
                    <FormLabel>Wedding Date</FormLabel>
                    <Stack direction="column" alignItems="flex-start" spacing={6}>
                      <DatePicker format="MM/dd/yyyy"  />
                    </Stack>
                  </FormControl>
                  <FormControl isInvalid={!!errors.email ?? false}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      {...register('email', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Education</FormLabel>
                    <Input type="text" {...register('Education')} />
                  </FormControl>
                  <FormControl isInvalid={!!errors.Landline ?? false}>
                    <FormLabel>Landline</FormLabel>
                    <Input
                      type="tel"
                      {...register('Landline', {
                        pattern: {
                          value: /^\d{10}$/,
                          message: 'Please enter a valid 11-digit landline number'
                        }
                      })}
                    />
                    <FormErrorMessage>{errors.Landline?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Native Place</FormLabel>
                    <Input type="text" {...register('NativePlace')} />
                  </FormControl>
                  <Heading>Address</Heading>
                  <FormControl>
                    <FormLabel>Full Address</FormLabel>
                    <Input type="text" {...register('FullAddress')} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Select placeholder="Select option" {...register('City')}>
                      {City &&
                        City.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>State</FormLabel>
                    <Select placeholder="Select option" {...register('State')}>
                      {State &&
                        State.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Pincode</FormLabel>
                    <Input type="number" {...register('Pincode')} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Locality</FormLabel>
                    <Select placeholder="Select option" {...register('Locality')}>
                      {Locality &&
                        Locality.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="email-alerts" mb="0">
                      Do you have business?
                    </FormLabel>
                    <Switch
                      id="toggle-switch"
                      colorScheme="teal"
                      isChecked={isSwitchOn}
                      onChange={handleSwitchChange}
                    />
                  </FormControl>
                  {isSwitchOn && <Business register={register} errors={errors} />}
                  <Button
                    colorScheme="blue"
                    type="submit"
                    size="lg"
                    alignSelf={'center'}
                    variant="outline">
                    Submit
                  </Button>
                </Flex>
              </form>
              {success && (
                <Alert status="success" mt={4}>
                  <AlertIcon />
                  Form submitted succesfully
                </Alert>
              )}
            </Box>
          </>
        )
      ) : (
        <>
          <Box
            display={'flex'}
            width={'100vw'}
            height={'100vh'}
            justifyContent={'center'}
            alignItems={'center'}
            pt={10}
            pb={10}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size={'xl'}
            />
          </Box>
        </>
      )}
    </>
  );
};

export const Business = ({ register, errors }) => {
  const Btype = ['HomeMaker', 'Self'];
  const Subtype = ['None', '1', '2', '3'];
  let [value, setValue] = React.useState('');

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <>
      <Flex
        flexDirection={'column'}
        gap={10}
        width={'100%'}
        pt={10}
        pb={10}
        justifyContent={'center'}>
        <Heading>Business</Heading>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register('bname')} />
        </FormControl>
        <FormControl>
          <FormLabel>Business Type</FormLabel>
          <Select placeholder="Type" {...register('bType')}>
            {Btype &&
              Btype.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Business SubType</FormLabel>
          <Select placeholder="SubType" {...register('SubType')}>
            {Subtype &&
              Subtype.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl isInvalid={!!errors.website ?? false}>
          <FormLabel>Website</FormLabel>
          <Input
            {...register('website', {
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: 'Please enter a valid website URL'
              }
            })}
          />
          <FormErrorMessage>{errors.website?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.bphone ?? false}>
          <FormLabel>Business Phone</FormLabel>
          <Input type="number" {...register('bphone')} />
          <FormErrorMessage>{errors.bphone?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input type="text" {...register('baddress')} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            {...register('description')}
            placeholder="Here is a sample placeholder"
            size="sm"
          />
        </FormControl>
      </Flex>
    </>
  );
};

export default Demo;
