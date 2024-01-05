/* eslint-disable react/prop-types */
import React from 'react';
import { useEffect } from 'react';
import { useDisclosure, Button, Box, Text, Select } from '@chakra-ui/react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';

import Table from '../../../../../components/Table/Table';
import { useState } from 'react';
import Form from '../../../../../components/Form/Form.tsx';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const Communities = () => {
  const { handleSubmit, register } = useForm();
  const status = ['Active', 'Pending Activation'];
  // Take from firebase
  const City = ['Faridabad', 'Udaipur'];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openForm = () => {
    onOpen();
  };

  const onFilter = (values) => {
    console.log(values);
  };

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/dashboard/community/${id}`);
    console.log(id);
  };

  const columns = [
    { Header: 'Name', accessor: 'Name' },
    {
      Header: 'Activated Members',
      accessor: 'ActivatedMembers'
    },
    {
      Header: 'Status',
      accessor: 'Status',

      Cell: ({ value }) => (
        <div style={value === 'Active' ? activeCellStyle : pendingCellStyle}>{value}</div>
      )
    },
    {
      Header: 'Link',
      accessor: 'id',
      Cell: ({ value }) => (
        <a href={`http://localhost:3000/invite/${value}`} target="_blank" rel="noopener noreferrer">
          http://localhost:3000/invite/{value}
        </a>
      )
    }
  ];

  const activeCellStyle = {
    padding: '6px 10px',
    alignItems: 'flex-start',
    gap: '10px',
    color: '#2DCD6F',
    display: 'flex',
    justifyContent: 'center',
    width: '4.2rem',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    borderRadius: '11px',
    background: '#DAFFDD'
  };

  const pendingCellStyle = {
    padding: '6px 10px',
    alignItems: 'flex-start',
    gap: '10px',
    color: '#F8B83E',
    display: 'flex',
    justifyContent: 'center',
    width: '10rem',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    borderRadius: '11px',
    background: '#FFF9E2'
  };

  const [data, setData] = useState([{}]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get('https://api.parivaarapp.in/community/all');
      console.log(res.data);
      const datas = res.data.communities.map((item) => ({
        Name: item.name || 'Tapasvi',
        ActivatedMembers: parseInt(item.totalMembers) || 0,
        Status: item.status || 'Pending Activation',
        id: item.id || ''
      }));
      setData(datas);
      console.log(data);
    };

    fetchdata();
  }, []);

  return (
    <>
      <Box
        width={'95%'}
        height={'90%'}
        margin={'auto'}
        mt={'4rem'}
        backgroundColor={'white'}
        borderRadius={'20px'}
        // pt={5}
        justifyContent={'center'}
        alignItems={'center'}
        border={' 1px solid #EAEAEA'}
        boxShadow={'0px 4px 37px 0px rgba(111, 100, 100, 0.04)'}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.6rem',
            paddingInline: '1rem'
          }}>
          <Text
            style={{
              fontFamily: 'Clash Display',
              fontSize: '1.3rem',
              fontWeight: '500',
              color: 'black'
            }}>
            Communities
          </Text>

          <Button
            color={'#0777FF'}
            backgroundColor={'#FFFFFF'}
            borderRadius={'18px'}
            border={'1.4px solid #0777FF'}
            onClick={openForm}>
            Add Community
          </Button>
        </Box>
        <Box
          width={'95%'}
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
                  Name
                </FormLabel>
                <Input
                  style={{
                    backgroundColor: '#F5F7F9',
                    borderRadius: '0.25rem',
                    width: '18rem',
                    border: '0.6px solid #F0F0F0 '
                  }}
                  {...register('Name')}
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
                  Status
                </FormLabel>
                <Box style={{ width: '18rem' }}>
                  <Select
                    {...register('status')}
                    style={{
                      backgroundColor: '#F5F7F9',
                      borderRadius: '0.25rem',
                      outline: 'none',
                      border: '0.6px solid #F0F0F0 '
                    }}>
                    {status.map((item, idx) => (
                      <option key={idx}>{item}</option>
                    ))}
                  </Select>
                </Box>
              </FormControl>
              <FormControl>
                <FormLabel
                  style={{
                    fontFamily: 'Clash Display',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                  City
                </FormLabel>
                <Box style={{ width: '18rem' }}>
                  <Select
                    style={{
                      backgroundColor: '#F5F7F9',
                      borderRadius: '0.25rem',

                      border: '0.6px solid #F0F0F0 '
                    }}
                    {...register('city')}>
                    {City.map((item, idx) => (
                      <option key={idx}>{item}</option>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </Box>
          </form>
        </Box>
        <Box style={{ paddingTop: '2rem' }}>
          <Table
            data={data}
            columns={columns}
            onRowClick={(row) => handleRowClick(row.original.id)}
          />
        </Box>
        <Form isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default Communities;
