import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPanel from '../components/MainPanel(Dashboard)/MainPanel';

import Demo from '../components/CommForm.tsx';
import CreateUser from '../components/CreateUser.js';
import LeftHead from '../components/ChakraDash/LeftHead.js';
import Edituser from '../components/EditUser.js/Edituser.js';
import Info from '../components/CommunityInfo/Info.js';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<MainPanel />} />

          <Route path="/invite/:id" element={<CreateUser />} />
          <Route path="/invite/:id/member" element={<Demo />} />
          <Route path="/" element={<LeftHead />} />
          <Route path="/dashboard/community/:id" element={<Info />} />
          <Route path="/dashboard/info/:phoneNumber" element={<Edituser />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
