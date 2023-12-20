/* eslint-disable react/prop-types */
import React from 'react';
import './DashHeader.css';
import Table from '../../Table/Table';

const DashHeader = () => {
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
  const data = [
    { Name: 'Tapasvi', ActivatedMembers: 123456789, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 223456789, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 323456789, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 423456789, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 523456789, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 623456789, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 723456789, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 823456789, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 923456789, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567890, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567891, Status: 'Active' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567892, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567893, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567894, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567895, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567896, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567897, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567898, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 1234567899, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 2234567890, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 2234567891, Status: 'Pending Activation' },
    { Name: 'Tapasvi', ActivatedMembers: 2234567892, Status: 'Pending Activation' }
  ];
  return (
    <div className="MainC">
      <div className="HeaderContainer">
        <p>Hi ,Chetan Kudnekar</p>
      </div>
      <div className="TableContainer">
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
};

export default DashHeader;
