import React from 'react';
import { Box } from '@chakra-ui/react';

import Communities from '../../moduels/auth/components/Dashboard/Communities/Communities.js';

// import Member from '../Member/Member.js';

// eslint-disable-next-line react/prop-types
const DashHead = ({ selected }) => {
  return (
    <Box
      position={'absolute'}
      width={'84.45%'}
      display={'flex'}
      justifyContent={'center'}
      height={'100vh'}
      flexDirection={'column'}
      right={0}>
      <Box
        backgroundColor={'black'}
        width={'100%'}
        height={'4.5vh'}
        position={'fixed'}
        top={0}
        zIndex={50}
      />
      <Box backgroundColor={'#FBFBFB'} height={'100%'}>
        {/* {selected === 'AboutUs' && <Member />} */}
        {/* edit user */}
        {/* <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingInline: '2rem',
            marginTop: '5rem'
          }}>
          <Box>
            <Text style={{ fontSize: '1.25rem', fontWeight: '600', fontFamily: 'Clash Display' }}>
              Edit User
            </Text>
          </Box>
          <Box style={{ display: 'flex', gap: '1rem' }}>
            <Button
              style={{
                borderRadius: '1.125rem',
                border: '1px solid #0777FF',
                fontFamily: 'Clash Display',
                fontSize: '0.75rem',
                color: '#0777FF',
                fontWeight: '600',
                letterSpacing: '0.0075rem'
              }}>
              Cancel
            </Button>
            <Button
              style={{
                borderRadius: '1.125rem',
                border: '1px solid #0777FF',
                backgroundColor: '#0777FF',
                fontFamily: 'Clash Display',
                fontSize: '0.75rem',
                color: '#FFFFFF',
                fontWeight: '600',
                letterSpacing: '0.0075rem'
              }}>
              Save Changes
            </Button>
          </Box>
        </Box> */}
        {/* edit user end */}

        {/* {selected === 'MyProfile' && <Profile />} */}
        {selected === 'AllCommunities' && <Communities />}
        {/* {selected === 'HelpCenter' && <Edituser />}  */}
      </Box>
    </Box>
  );
};

export default DashHead;
