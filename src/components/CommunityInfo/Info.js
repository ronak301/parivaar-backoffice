/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Image } from '@chakra-ui/react';
import axios from 'axios';
import Member from '../Member/Member';
import { useParams } from 'react-router-dom';
import { LeftPanel } from '../ChakraDash/LeftHead';
import Logo3 from '../../assets/element2.png';
import Logo4 from '../../assets/grp.png';
import Logo5 from '../../assets/grp2.png';
import Logo6 from '../../assets/Vector.png';
import { useDisclosure } from '@chakra-ui/react';
import EditCommunity from '../Form/EditCommunity.tsx';
const Info = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openForm = () => {
    console.log('form opened');
    onOpen();
  };
  const [data, setData] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const CommunityInfo = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://api.parivaarapp.in/community/${id}`);

          setData(response.data);
          console.log(response.data);

          console.log(response.data.logo);
        }
      } catch (error) {
        console.error('Error fetching community information:', error);
      }
    };
    console.log(id);
    CommunityInfo();
  }, [id]);

  const [selectedOption, setSelectedOption] = useState(0);
  const options = [
    { icon: Logo3, label: 'AllCommunities' },
    { icon: Logo4, label: 'MyProfile' },
    { icon: Logo5, label: 'AboutUs' },
    { icon: Logo6, label: 'HelpCenter' }
  ];
  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <Box>
      <LeftPanel
        options={options}
        handleOptionClick={handleOptionClick}
        selectedOption={selectedOption}
      />

      <Box
        position={'absolute'}
        width={'84.45%'}
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        right={0}
        marginTop={'4rem'}>
        <Box
          backgroundColor={'black'}
          width={'100%'}
          height={'4.5vh'}
          position={'fixed'}
          top={0}
          zIndex={50}
        />
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>
          <Box
            style={{
              width: '95%',
              paddingBottom: '2rem',
              borderRadius: '0.625rem',
              paddingLeft: '1rem',
              paddingTop: '1rem',
              height: '95%',
              border: '1px solid #EAEAEA',
              backgroundColor: '#FFFFFF'
            }}>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%'
              }}>
              <Text
                fontFamily={'Clash Display'}
                fontSize={'20px'}
                fontWeight={'600'}
                color={'black'}>
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
                }}
                onClick={openForm}>
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
            <EditCommunity isOpen={isOpen} onClose={onClose} FormData={data} />

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
        </Box>
        <Member communityId={id} />
      </Box>
    </Box>
  );
};

export default Info;
