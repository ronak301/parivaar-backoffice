import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from '../components/Form/Form.tsx';
import MainPanel from '../components/MainPanel(Dashboard)/MainPanel';
import Profile from '../moduels/auth/components/Dashboard/Profile/Profile.js';
import Fire from '../components/Fire.js';
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dash" element={<MainPanel />} />
          <Route path="/form" element={<Form />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fire" element={<Fire />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
