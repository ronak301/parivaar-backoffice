/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Flex, Image, Text, Heading } from '@chakra-ui/react';

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
    <Box pt={10} pb={10}>
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

        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          First Name: {name}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Last Name: {lastname}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Mobile Number: {MobileNumber}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Date of Birth: {dateValue}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Gender: {gender}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Blood Group: {bloodGrp}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Guardian Name: {gname}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Wedding Date: {weddingDate}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Email: {email}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Education: {Education}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Landline: {Landline}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Native Place: {NativePlace}
        </Text>
        <Heading>Address</Heading>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Full Address: {FullAddress}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          City: {City}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          State: {State}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Pincode: {Pincode}
        </Text>
        <Text fontSize="xl" fontWeight={'300'} color={'black'}>
          Locality: {Locality}
        </Text>

        <Flex
          flexDirection={'column'}
          gap={10}
          width={'100%'}
          pt={10}
          pb={10}
          justifyContent={'center'}>
          <Heading>Business</Heading>

          <Text fontSize="xl" fontWeight={'300'} color={'black'}>
            Name: {bname}
          </Text>
          <Text fontSize="xl" fontWeight={'300'} color={'black'}>
            Business Type: {bType}
          </Text>
          <Text fontSize="xl" fontWeight={'300'} color={'black'}>
            Business SubType: {SubType}
          </Text>
          <Text fontSize="xl" fontWeight={'300'} color={'black'}>
            Website: {website}
          </Text>
          <Text fontSize="xl" fontWeight={'300'} color={'black'}>
            Business Phone: {bphone}
          </Text>
          <Text fontSize="xl" fontWeight={'300'} color={'black'}>
            Address: {baddress}
          </Text>
          <Text fontSize="xl" fontWeight={'300'} color={'black'}>
            Description: {description}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Details;
