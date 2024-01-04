import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from '../components/Form/Form.tsx';
import MainPanel from '../components/MainPanel(Dashboard)/MainPanel';

import Demo from '../components/CommForm.tsx';
import CreateUser from '../components/CreateUser.js';
import LeftHead from '../components/ChakraDash/LeftHead.js';
import Edituser from '../components/EditUser.js/Edituser.js';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<MainPanel />} />
          <Route path="/form" element={<Form />} />
          <Route path="/invite/:id" element={<CreateUser />} />
          <Route path="/invite/:id/member" element={<Demo />} />
          <Route path="/" element={<LeftHead />} />
          <Route path="/edit" element={<Edituser />} />
          <Route path="/dashboard/info/:phoneNumber" element={<Edituser />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
