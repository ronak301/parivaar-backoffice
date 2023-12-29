/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Card, Image, Stack, Heading, Text, CardBody } from '@chakra-ui/react';
import axios from 'axios';

const ProfileCard = ({ uid }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      let res = await axios.get(`https://api.parivaarapp.in/user/${uid}`);
      console.log(res.data.data);
      setUser(res.data.data);
    };
    fetchUser();
  }, []);
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      height={{ base: 'auto', sm: '400px' }}
      width={{ base: '100%', sm: '400px' }}
      overflow="hidden"
      variant="outline">
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={user?.profilePicture}
        alt={`${user?.firstName} ${user?.lastName}`}
      />

      <Stack spacing={4} p={4}>
        <CardBody>
          <Heading size="md" pb={5}>{`${user?.firstName} ${user?.lastName}`}</Heading>
          <Text color={'black'} fontSize={['sm', 'md', 'lg']}>{`Phone: ${user?.phone}`}</Text>
          <Text color={'black'} fontSize={['sm', 'md', 'lg']}>{`Business: ${
            user?.business || 'N/A'
          }`}</Text>
          <Text color={'black'} fontSize={['sm', 'md', 'lg']}>{`Date of Birth: ${
            user?.dob || 'N/A'
          }`}</Text>
          <Text color={'black'} fontSize={['sm', 'md', 'lg']}>{`Blood Group: ${
            user?.bloodGroup || 'N/A'
          }`}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default ProfileCard;
