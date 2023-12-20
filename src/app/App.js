import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPanel from '../components/MainPanel(Dashboard)/MainPanel';
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dash" element={<MainPanel />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
