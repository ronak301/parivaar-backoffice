/* eslint-disable indent */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import './ManePanel.css';
import Logo1 from '../../assets/Logo1.png';
import Logo2 from '../../assets/element2.png';
import Logo3 from '../../assets/grp.png';
import Logo4 from '../../assets/grp2.png';
import Logo5 from '../../assets/Vector.png';
import Logo6 from '../../assets/vector2.png';
import logo7 from '../../assets/V2.png';
import DashHeader from '../Comm-Dashboard/Header/DashHeader';

import DashHead from '../Comm-Dashboard/DashHead';

const MainPanel = () => {
  const [selectedItem, setSelectedItem] = useState('AllCommunities');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const getButtonStyle = (item) => {
    return selectedItem === item
      ? {
          borderRadius: '6px',
          border: '1px solid #0777FF',
          cursor: 'pointer',
          padding: '12px 0px',
          // display: 'flex',
          backgroundColor: '#0777FF'
          // justifyContent: 'center'
        }
      : {
          cursor: 'pointer'
        };
  };

  return (
    <>
      {selectedItem === 'AllCommunities' && (
        <>
          <DashHeader />
        </>
      )}
      {selectedItem === 'MyProfile' && (
        <>
          <DashHead selected={selectedItem} />
        </>
      )}

      <div className="MainContainer">
        <div className="SubContainer1">
          <div className="Subc1">
            <img src={Logo1} />
            <h1>Parivaar</h1>
          </div>
          <div className="Subc1">
            <span>India's First Local Community App</span>
          </div>
        </div>
        <div className="line1">
          <img src={logo7} />
        </div>
        <div className="SubContainer2">
          <div
            className="Subc2"
            style={getButtonStyle('AllCommunities')}
            onClick={() => handleItemClick('AllCommunities')}>
            <img src={Logo2} />
            <p>All Communities</p>
          </div>
          <div
            className="Subc2"
            style={getButtonStyle('MyProfile')}
            onClick={() => handleItemClick('MyProfile')}>
            <img src={Logo3} />
            <p>My Profile</p>
          </div>
          <div
            className="Subc2"
            style={getButtonStyle('AboutUs')}
            onClick={() => handleItemClick('AboutUs')}>
            <img src={Logo4} />
            <p>About us</p>
          </div>
          <div
            className="Subc2"
            style={getButtonStyle('HelpCenter')}
            onClick={() => handleItemClick('HelpCenter')}>
            <img src={Logo5} />
            <p>Help Center</p>
          </div>
        </div>
        <div className="line2">
          <img src={logo7} />
          <div className="MainFooter">
            <img src={Logo6} />
            <p>Log Out</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPanel;
