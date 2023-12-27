/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './DashHeader.css';
import { useEffect } from 'react';
import axios from 'axios';
import Table from '../../Table/Table';
import { Box, Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import Form from '../../Form/Form.tsx';

const DashHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openForm = () => {
    onOpen();
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
    <div className="MainC">
      <div className="HeaderContainer">
        <p>Hi ,Chetan Kudnekar</p>
      </div>

      <div className="TableContainer">
        <Box position={'absolute'} right={20} top={40}>
          <Button
            color={'#0777FF'}
            backgroundColor={'#FFFFFF'}
            borderRadius={'18px'}
            border={'1.4px solid #0777FF'}
            onClick={openForm}>
            Add Community
          </Button>
        </Box>
        <Table data={data} columns={columns} />
      </div>
      <Form isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default DashHeader;
