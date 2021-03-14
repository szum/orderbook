import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ProductFeedPage } from './pages/ProductFeedPage/ProductFeedPage';

import { WebSocketContextProvider } from './components/WebSocketContext/WebSocketContext';


// SPEC FOR THE APP FILE

function App() {
  return (
    <div className="OrderbookApp">
      <WebSocketContextProvider>
        <ProductFeedPage />
      </WebSocketContextProvider>
    </div>
  );
}

export default App;
