/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Image } from '@chakra-ui/react';
import axios from 'axios';
import Member from '../Member/Member';

const Info = ({ cid }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const CommunityInfo = async () => {
      try {
        const response = await axios.get(`https://api.parivaarapp.in/community/${cid}`);
        setData(response.data);
        console.log(response.data);

        console.log(response.data.logo);
      } catch (error) {
        console.error('Error fetching community information:', error);
      }
    };
    CommunityInfo();
  }, []);

  return (
    <>
      <Box
        width={'95%'}
        height={'28rem'}
        margin={'auto'}
        mt={'4rem'}
        backgroundColor={'white'}
        borderRadius={'10px'}
        padding={8}
        border={'1px solid #EAEAEA'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        boxShadow={'0px 4px 37px 0px rgba(111, 100, 100, 0.04)'}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <Text fontFamily={'Clash Display'} fontSize={'20px'} fontWeight={'600'} color={'black'}>
            Community Info
          </Text>
          <Button
            style={{
              padding: '16px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderRadius: '18px',
              border: '1px solid #0777FF',
              gap: '6px'
            }}>
            <Box>
              <Text
                style={{
                  color: ' #0777FF',
                  fontFamily: 'Clash Display',
                  fontSize: '15px',
                  fontWeight: 600
                }}>
                +
              </Text>
            </Box>
            <Box>
              <Text
                style={{
                  color: ' #0777FF',
                  fontFamily: 'Clash Display',
                  fontSize: '15px',
                  fontWeight: 600
                }}>
                Edit
              </Text>
            </Box>
          </Button>
        </Box>
        <Box
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            gap: '450px'
          }}>
          {/* Main */}
          <Box
            style={{
              paddingTop: '22px',
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              gap: '30px',
              width: '100%'
            }}>
            {/* Content Box 1 */}
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#666666'
                  }}>
                  Name
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#000000'
                  }}>
                  {data?.name}
                </Text>
              </Box>
            </Box>

            {/* Content Box 2 */}
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#666666'
                  }}>
                  City
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#000000'
                  }}>
                  {data?.city || 'null'}
                </Text>
              </Box>
            </Box>

            {/* Content Box 3 */}
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#666666'
                  }}>
                  Sub-type
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#000000'
                  }}>
                  {data?.subType}
                </Text>
              </Box>
            </Box>

            {/* Content Box 4 */}
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#666666'
                  }}>
                  Status
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#000000'
                  }}>
                  {data?.status}
                </Text>
              </Box>
            </Box>
          </Box>

          {/* start box2 */}
          <Box
            style={{
              paddingTop: '32px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '30px',
              flexDirection: 'column',
              width: '100%'
            }}>
            {/* Content Box 5 */}
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#666666'
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#000000'
                  }}>
                  {data?.description}
                </Text>
              </Box>
            </Box>

            {/* Content Box 6 */}
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#666666'
                  }}>
                  Type
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#000000'
                  }}>
                  {data?.type}
                </Text>
              </Box>
            </Box>

            {/* Content Box 7 */}
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}>
                <Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    fontFamily: 'Clash Display',
                    color: '#666666'
                  }}>
                  Logo
                </Text>
                <Image
                  src={data?.logo}
                  style={{
                    width: '6.5rem',
                    height: '6.5rem',
                    borderRadius: '4rem'
                  }}
                />
              </Box>
            </Box>
            {/* Content Box 8 */}
            <Box></Box>
          </Box>

          {/* end */}
        </Box>
        {/* Main end */}
      </Box>
      <Member communityId={cid} />
    </>
  );
};

export default Info;
