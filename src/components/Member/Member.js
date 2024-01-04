/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Text, Button, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Table from '../Table/Table';

import { useDisclosure } from '@chakra-ui/react';
import AddUserForm from '../Form/AddUserForm.tsx';
import { useNavigate } from 'react-router-dom';

const Member = ({ communityId }) => {
  const { register, handleSubmit } = useForm();
  const onFilter = (values) => {
    console.log(values.firstName, values.lastName, values.phone);
  };
  const columns = [
    { Header: 'Full Name', accessor: 'FullName' },
    {
      Header: 'Phone Number',
      accessor: 'PhoneNumber'
    },
    {
      Header: 'Blood Group',
      accessor: 'BloodGroup'
    },
    {
      Header: 'Profile Picture',
      accessor: 'profilePicture',
      Cell: ({ value }) => (
        <Image
          src={value || 'default-profile-picture-url'}
          alt="Profile"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      )
    }
  ];
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const handleRowClick = (row) => {
    const phoneNumber = row.original.PhoneNumber;
    setSelectedUser(phoneNumber);
    const data = communityId;
    navigate(`/dashboard/info/${phoneNumber}`, { state: data });

    console.log(selectedUser);
  };

  const [data, setData] = useState([{}]);

  useEffect(() => {
    const memberData = async () => {
      const response = await axios.post(
        `https://api.parivaarapp.in/community/members/${communityId}`,
        {
          query: '',
          filter: {},
          skip: 0,
          limit: 100
        }
      );
      console.log(response.data);
      setData(
        response.data.members.rows.map((member) => ({
          FullName: `${member.firstName} ${member.lastName}`,
          PhoneNumber: member.phone,
          BloodGroup: member.bloodGroup,
          profilePicture: member.profilePicture
        }))
      );
    };

    memberData();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const openForm = () => {
    console.log('form opened');
    onOpen();
  };

  return (
    <>
      <Box style={{ display: 'flex', justifyContent: 'center', paddingBottom: '3rem' }}>
        {selectedUser ? null : (
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '2rem',
              justifyContent: 'center',
              paddingInline: '2rem',
              marginTop: '5rem',
              borderRadius: '1rem',
              border: '1px solid #EAEAEA',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 4px 37px 0px rgba(111, 100, 100, 0.04)',
              width: '95%'
            }}>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
              }}>
              <Text
                fontFamily={'Clash Display'}
                fontSize={'20px'}
                fontWeight={'600'}
                color={'black'}>
                Members
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
                  <Box
                    style={{
                      color: ' #0777FF',
                      fontFamily: 'Clash Display',
                      fontSize: '15px',
                      fontWeight: 600
                    }}>
                    Add Member
                  </Box>
                </Box>
              </Button>
              <AddUserForm isOpen={isOpen} onClose={onClose} />
            </Box>
            <Box
              width={'100%'}
              height={'20vh'}
              margin={'auto'}
              mt={10}
              backgroundColor={'white'}
              borderRadius={'0.625rem'}
              padding={8}
              gap={'2rem'}
              display={'flex'}
              border={'1px solid #EAEAEA'}
              flexDirection={'column'}
              alignItems={'flex-start'}>
              <Box>
                <Text
                  style={{
                    fontFamily: 'Clash Display',
                    fontSize: '1rem',
                    fontWeight: '500',
                    lineHeight: '1.5rem'
                  }}>
                  Filter Memebers
                </Text>
              </Box>

              <form onSubmit={handleSubmit(onFilter)} style={{ width: '100%' }}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%'
                  }}>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontFamily: 'Clash Display',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                      FirstName
                    </FormLabel>
                    <Input
                      style={{
                        backgroundColor: '#F5F7F9',
                        borderRadius: '0.25rem',
                        width: '18rem',
                        border: '0.6px solid #F0F0F0 '
                      }}
                      {...register('firstName')}
                      type="text"
                      placeholder="Enter Name "
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontFamily: 'Clash Display',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                      LastName
                    </FormLabel>
                    <Input
                      {...register('lastName')}
                      style={{
                        backgroundColor: '#F5F7F9',
                        borderRadius: '0.25rem',
                        width: '18rem',
                        border: '0.6px solid #F0F0F0 '
                      }}
                      type="text"
                      placeholder="Enter last Name"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontFamily: 'Clash Display',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                      Phone
                    </FormLabel>
                    <Input
                      style={{
                        backgroundColor: '#F5F7F9',
                        borderRadius: '0.25rem',
                        width: '18rem',
                        border: '0.6px solid #F0F0F0 '
                      }}
                      {...register('phone')}
                      type="number"
                      placeholder="Enter Phone Number"
                    />
                  </FormControl>
                </Box>
              </form>
            </Box>
            <Box style={{ paddingTop: '2rem' }}>
              <Table onRowClick={(row) => handleRowClick(row)} columns={columns} data={data} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Member;
