import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from '../components/Form/Form.tsx';
import MainPanel from '../components/MainPanel(Dashboard)/MainPanel';

import Demo from '../components/CommForm.tsx';
import CreateUser from '../components/CreateUser.js';
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<MainPanel />} />
          <Route path="/form" element={<Form />} />

          <Route path="/invite/:id" element={<CreateUser />} />
          <Route path="/invite/:id/member" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
