/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { DatePicker, Stack } from 'rsuite';
import { useNavigate, useParams } from 'react-router-dom';
import 'rsuite/dist/rsuite.css';
import { Image, Text } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';

import { FormControl, FormLabel, Input, Select, useDisclosure } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import Details from './Details.js';

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
import ProfileCard from './ProfileCard.js';

const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const navigate = useNavigate();
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
  const handleAddClick = () => {
    window.location.reload();
  };
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
      let uid = await createUser(values.name, values.lastname, values.MobileNumber);
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
  const [dateValue, setDatevalue] = useState(null);
  const dateChange = (value, event) => {
    setDatevalue(value);
  };

  return (
    <>
      {!loading ? (
        success ? (
          <>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              width={'100%'}
              height={'400px'}
              // border={'2px solid red'}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={10}
                justifyContent={'center'}
                alignItems={'center'}
                // border={'2px solid red'}
              >
                <Text color={'black'} fontSize={['24px', '32px', '40px']}>
                  Thank you for submitting the form !
                </Text>
                <Button
                  colorScheme="twitter"
                  fontSize={['16px', '20px']}
                  onClick={() => {
                    navigate(`/invite/${id}`);
                  }}>
                  Submit another response
                </Button>
              </Box>
            </Box>
            <Box>
              <Text
                color={'black'}
                fontWeight={300}
                textAlign={'center'}
                fontSize={['24px', '32px', '40px']}>
                Here are your filled Details
              </Text>
              <Details
                values={formValues}
                imgurl={imgurl}
                communityName={communityName}
                commDescription={commDescription}
                dateValue={dateValue}
              />
            </Box>
          </>
        ) : (
          <>
            <Box backgroundColor={'#e9f2ed'} pt={10} pb={10}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex
                  flexDirection={'column'}
                  gap={10}
                  width={['80%', '80%', '50%']}
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
                        <Text color={'black'}>
                          User Already exist are you sure you want to join this community
                        </Text>
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button onClick={onClose} fontSize={['16px', '20px']} ref={cancelRef}>
                          No
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
                          fontSize={['16px', '20px']}
                          onClick={() => JoinCommunity(userId)}>
                          Yes
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Box display={'flex'} flexDirection={'row'} gap={0} alignItems={'center'}>
                    <Image src={imgurl} alt="img" maxWidth={['30%', '80%', '150px']} />
                    <Box
                      pl={5}
                      display={'flex'}
                      flexDirection={'column'}
                      gap={5}
                      justifyContent={'center'}>
                      <Text
                        color="black"
                        fontSize={['10px', '20px', '20px']}
                        fontWeight={'500'}
                        lineHeight={1}>
                        {communityName}
                      </Text>

                      <Text
                        width={'200px'}
                        fontSize={['10px', '20px', '20px']}
                        color={'black'}
                        lineHeight={2}>
                        {commDescription}
                      </Text>
                    </Box>
                  </Box>

                  <FormControl isRequired>
                    <FormLabel fontSize={['10px', '20px', '20px']}>First Name</FormLabel>
                    <Input {...register('name')}  type="name" size={['xs','sm','md']} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Last Name</FormLabel>
                    <Input type="name" {...register('lastname')} size={['xs','sm','md']} />
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.MobileNumber ?? false}>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Mobile Number</FormLabel>
                    <Input
                    size={['xs','sm','md']}
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
                    <FormLabel fontSize={['10px', '20px', '20px']}>Date of Birth</FormLabel>
                    <Stack direction="column" alignItems="flex-start" spacing={6}>
                      <DatePicker format="MM/dd/yyyy" value={dateValue} onChange={dateChange}/>
                    </Stack>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Gender</FormLabel>
                    <Select placeholder="Select option" {...register('gender')} size={['xs','sm','md']}>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Blood Group</FormLabel>
                    <Select placeholder="Select option" {...register('bloodGrp')} size={['xs','sm','md']}>
                      {BloodGrp &&
                        BloodGrp.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Guardian Name</FormLabel>
                    <Input type="name" {...register('gname')}  size={['xs','sm','md']}/>
                  </FormControl>
                  <FormControl {...register('weddingDate')}>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Wedding Date</FormLabel>
                    <Stack direction="column" alignItems="flex-start" spacing={6}>
                      <DatePicker format="MM/dd/yyyy" />
                    </Stack>
                  </FormControl>
                  <FormControl isInvalid={!!errors.email ?? false}>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Email</FormLabel>
                    <Input
                    size={['xs','sm','md']}
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
                    <FormLabel fontSize={['10px', '20px', '20px']}>Education</FormLabel>
                    <Input type="text" {...register('Education')} 
                    size={['xs','sm','md']}
                    />
                  </FormControl>
                  <FormControl isInvalid={!!errors.Landline ?? false}>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Landline</FormLabel>
                    <Input
                    size={['xs','sm','md']}
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
                    <FormLabel fontSize={['10px', '20px', '20px']}>Native Place</FormLabel>
                    <Input type="text" {...register('NativePlace')}
                    size={['xs','sm','md']}
                    />
                  </FormControl>
                  <Heading fontSize={['24px', '32px', '40px']}>Address</Heading>
                  <FormControl>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Full Address</FormLabel>
                    <Input type="text" {...register('FullAddress')} 
                    size={['xs','sm','md']}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={['10px', '20px', '20px']}>City</FormLabel>
                    <Select placeholder="Select option" {...register('City')} size={['xs','sm','md']}>
                      {City &&
                        City.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={['10px', '20px', '20px']}>State</FormLabel>
                    <Select placeholder="Select option" {...register('State')} size={['xs','sm','md']}>
                      {State &&
                        State.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Pincode</FormLabel>
                    <Input type="number" {...register('Pincode')} 
                    size={['xs','sm','md']}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={['10px', '20px', '20px']}>Locality</FormLabel>
                    <Select placeholder="Select option" {...register('Locality')} size={['xs','sm','md']}>
                      {Locality &&
                        Locality.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel fontSize={['10px', '20px', '20px']} htmlFor="email-alerts" mb="0">
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
                    fontSize={['10px', '20px']}
                    width={'80%'}
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
        <Heading fontSize={['24px', '32px', '40px']}>Business</Heading>
        <FormControl>
          <FormLabel fontSize={['10px', '20px', '20px']}>Name</FormLabel>
          <Input type="text" {...register('bname')}
          size={['xs','sm','md']}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['10px', '20px', '20px']}>Business Type</FormLabel>
          <Select placeholder="Type" {...register('bType')} size={['xs','sm','md']}>
            {Btype &&
              Btype.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['10px', '20px', '20px']}>Business SubType</FormLabel>
          <Select placeholder="SubType" {...register('SubType')} size={['xs','sm','md']}>
            {Subtype &&
              Subtype.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl isInvalid={!!errors.website ?? false}>
          <FormLabel fontSize={['10px', '20px', '20px']}>Website</FormLabel>
          <Input
          size={['xs','sm','md']}
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
          <FormLabel fontSize={['10px', '20px', '20px']}>Business Phone</FormLabel>
          <Input type="number" {...register('bphone')}
          size={['xs','sm','md']} />
          <FormErrorMessage>{errors.bphone?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['10px', '20px', '20px']}>Address</FormLabel>
          <Input type="text" {...register('baddress')} 
          size={['xs','sm','md']}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={['10px', '20px', '20px']}>Description</FormLabel>
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


