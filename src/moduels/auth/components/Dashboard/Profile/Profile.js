import { Box, Text, Image, Input } from '@chakra-ui/react';
import React from 'react';

const Profile = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={10} pl={5}>
      <Box>
        <Text color={'black'} fontWeight={'600'} fontSize={'20px'} fontFamily={'Arial'}>
          Personal Information
        </Text>
      </Box>
      <Box
        width={'200px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        gap={2}>
        <Text color={'black'} fontSize={'17px'} fontWeight={400} pl={3}>
          Profile Picture
        </Text>
        <Image borderRadius="full" boxSize="150px" src={''} alt="Dan Abramov" />
      </Box>
      <Box display={'flex'} gap={800} alignItems={'flex-start'}>
        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          flexDirection={'column'}>
          <Text fontSize={'18px'} color={'black'}>
            First Name
          </Text>
          <Input
            fontWeight={500}
            fontSize={'20px'}
            p={0}
            value={'Tapasvi Arora'}
            border={'none'}
            readOnly
          />
        </Box>
        <Box>
          <Text color={'black'}>Last Name</Text>
          <Input
            fontWeight={500}
            fontSize={'20px'}
            textAlign={'start'}
            p={0}
            readOnly
            border={'none'}
            value={'Tapasvi Arora'}
          />
        </Box>
      </Box>
      <Box display={'flex'} gap={800} alignItems={'flex-start'}>
        <Box>
          <Text color={'black'}>Date of Birth</Text>
          <Input
            textAlign={'start'}
            fontWeight={500}
            fontSize={'20px'}
            readOnly
            p={0}
            border={'none'}
            value={'80/03/8002'}
          />
        </Box>
        <Box>
          <Text color={'black'}>Phone Number</Text>
          <Input
            textAlign={'start'}
            fontWeight={500}
            p={0}
            fontSize={'20px'}
            readOnly
            border={'none'}
            value={'8766311733'}
          />
        </Box>
      </Box>
      <Box display={'flex'} gap={800} alignItems={'flex-start'}>
        <Box>
          <Text color={'black'}>Blood Group</Text>
          <Input
            fontWeight={500}
            fontSize={'20px'}
            p={0}
            textAlign={'start'}
            readOnly
            border={'none'}
            value={'B+'}
          />
        </Box>
      </Box>
      <Box width={'99.5%'} pl={0} m={0} height="1px" margin={'auto'} backgroundColor={'#EAEAEA'}>
        {' '}
      </Box>

      <Box pt={5}>
        <Text color={'black'} fontWeight={'600'} fontSize={'20px'} fontFamily={'Arial'}>
          Business Information
        </Text>
      </Box>
      <Box display={'flex'} gap={800} alignItems={'flex-start'}>
        <Box>
          <Text color={'black'}>Name</Text>
          <Input
            fontWeight={500}
            fontSize={'20px'}
            p={0}
            textAlign={'start'}
            readOnly
            border={'none'}
            value={'Tapasvi Arora'}
          />
        </Box>
        <Box>
          <Text color={'black'}>Description</Text>
          <Input
            textAlign={'start'}
            fontWeight={500}
            fontSize={'20px'}
            readOnly
            p={0}
            border={'none'}
            value={'Tapasvi Arora'}
          />
        </Box>
      </Box>
      <Box display={'flex'} gap={800} alignItems={'flex-start'}>
        <Box>
          <Text color={'black'}>Address</Text>
          <Input
            textAlign={'start'}
            fontWeight={500}
            fontSize={'20px'}
            readOnly
            p={0}
            border={'none'}
            value={'80/03/8002'}
          />
        </Box>
        <Box>
          <Text color={'black'}>Phone Number</Text>
          <Input
            textAlign={'start'}
            fontWeight={500}
            fontSize={'20px'}
            p={0}
            readOnly
            border={'none'}
            value={'8766311733'}
          />
        </Box>
      </Box>
      <Box display={'flex'} gap={800} alignItems={'flex-start'}>
        <Box>
          <Text color={'black'}>Web Site</Text>
          <Input
            textAlign={'start'}
            p={0}
            fontWeight={500}
            fontSize={'20px'}
            readOnly
            border={'none'}
            value={'ww2.google.com'}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
