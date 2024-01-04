/* eslint-disable react/prop-types */
import React from 'react';
import { useEffect } from 'react';
import { useDisclosure, Button, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import Table from '../../../../../components/Table/Table';
import { useState } from 'react';
import Form from '../../../../../components/Form/Form.tsx';
import Info from '../../../../../components/CommunityInfo/Info.js';
const Communities = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openForm = () => {
    onOpen();
  };
  const [selected, setSelected] = useState(false);
  const [communityId, setCommunityId] = useState(null);

  const handleRowClick = (id) => {
    setSelected(true);
    setCommunityId(id);
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
      {selected ? (
        <Info cid={communityId} />
      ) : (
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
          <Box style={{ paddingTop: 320 }}>
            <Table
              data={data}
              columns={columns}
              onRowClick={(row) => handleRowClick(row.original.id)}
            />
          </Box>
          <Form isOpen={isOpen} onClose={onClose} />
        </Box>
      )}
    </>
  );
};

export default Communities;
