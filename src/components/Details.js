/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Flex, Image, FormLabel, Input, Text, Textarea, Heading } from '@chakra-ui/react';
import { DatePicker, Stack } from 'rsuite';

import 'rsuite/dist/rsuite.css';
const Details = ({ values, imgurl, communityName, commDescription, dateValue }) => {
  const {
    name,
    lastname,
    MobileNumber,
    DOB,
    gender,
    bloodGrp,
    gname,
    weddingDate,
    email,
    Education,
    Landline,
    NativePlace,
    FullAddress,
    City,
    State,
    Pincode,
    Locality,
    bname,
    bType,
    SubType,
    website,
    bphone,
    baddress,
    description
  } = values;
  console.log('Dob is', DOB);
  return (
    <Box backgroundColor={'#e9f2ed'} pt={10} pb={10}>
      <form>
        <Flex
          flexDirection={'column'}
          gap={10}
          width={'50%'}
          pt={10}
          pb={10}
          justifyContent={'center'}
          margin={'auto'}
          backgroundColor="#ffffff"
          borderRadius="8px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          padding={6}>
          <Box display={'flex'} flexDirection={'row'} gap={100} alignItems={'center'}>
            <Image src={imgurl} width={'140px'} height={'140px'} />
            <Box display={'flex'} flexDirection={'column'} gap={5} justifyContent={'center'}>
              <Text color="black" fontSize={'40'} fontWeight={'500'} lineHeight={1}>
                {communityName}
              </Text>

              <Text width={'350px'} color={'black'} lineHeight={2}>
                {commDescription}
              </Text>
            </Box>
          </Box>

          <FormLabel>First Name</FormLabel>
          <Input value={name} type="name" />

          <FormLabel>Last Name</FormLabel>
          <Input type="name" value={lastname} />

          <FormLabel>Mobile Number</FormLabel>
          <Input value={MobileNumber} />

          <FormLabel>Date of Birth</FormLabel>
          <Stack direction="column" alignItems="flex-start" spacing={6}>
            <DatePicker format="MM/dd/yyyy" value={dateValue} />
          </Stack>

          <FormLabel>Gender</FormLabel>
          <Input value={gender} />

          <FormLabel>Blood Group</FormLabel>
          <Input value={bloodGrp} />

          <FormLabel>Guardian Name</FormLabel>
          <Input type="name" value={gname} />

          <FormLabel>Wedding Date</FormLabel>
          <Stack direction="column" alignItems="flex-start" spacing={6}>
            <DatePicker format="MM/dd/yyyy" value={weddingDate} />
          </Stack>

          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} />

          <FormLabel>Education</FormLabel>
          <Input value={Education} />

          <FormLabel>Landline</FormLabel>
          <Input value={Landline} />

          <FormLabel>Native Place</FormLabel>
          <Input value={NativePlace} />

          <Heading>Address</Heading>

          <FormLabel>Full Address</FormLabel>
          <Input value={FullAddress} />

          <FormLabel>City</FormLabel>
          <Input value={City} />
          <FormLabel>State</FormLabel>
          <Input value={State} />

          <FormLabel>Pincode</FormLabel>
          <Input type="number" value={Pincode} />

          <FormLabel>Locality</FormLabel>
          <Input value={Locality} />
          <Flex
            flexDirection={'column'}
            gap={10}
            width={'100%'}
            pt={10}
            pb={10}
            justifyContent={'center'}>
            <Heading>Business</Heading>

            <FormLabel>Name</FormLabel>
            <Input type="text" value={bname} />

            <FormLabel>Business Type</FormLabel>
            <Input value={bType} />

            <FormLabel>Business SubType</FormLabel>
            <Input value={SubType} />

            <FormLabel>Website</FormLabel>
            <Input value={website} />

            <FormLabel>Business Phone</FormLabel>
            <Input type="number" value={bphone} />

            <FormLabel>Address</FormLabel>
            <Input type="text" value={baddress} />

            <FormLabel>Description</FormLabel>
            <Textarea value={description} />
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default Details;
