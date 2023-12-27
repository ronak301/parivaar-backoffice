import React from 'react';
import { Box } from '@chakra-ui/react';
import Profile from '../../moduels/auth/components/Dashboard/Profile/Profile';

// eslint-disable-next-line react/prop-types
const DashHead = ({ selected }) => {
  return (
    <Box
      position={'absolute'}
      width={'84.9%'}
      display={'flex'}
      justifyContent={'center'}
      //   border={'2px solid red'}
      height={'100vh'}
      flexDirection={'column'}
      right={0}>
      <Box backgroundColor={'black'} width={'100%'} height={'4vh'} />
      <Box backgroundColor={'#FBFBFB'} height={'100%'}>
        <Box
          width={'95%'}
          height={'90%'}
          margin={'auto'}
          mt={10}
          backgroundColor={'white'}
          borderRadius={'20px'}
          pt={5}
          border={' 1px solid #EAEAEA'}
          boxShadow={'0px 4px 37px 0px rgba(111, 100, 100, 0.04)'}>
          {selected && <Profile />}
        </Box>
      </Box>
    </Box>
  );
};

export default DashHead;
