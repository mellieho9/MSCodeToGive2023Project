import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import FeedbackPage from './pages/FeedbackPage';
import DeliveryStatusPage from './pages/DeliveryStatusPage';
import MapPage from './pages/MapPage';
import InventoryPage from './pages/InventoryPage';
import CalendarPage from './pages/CalendarPage';
import "./css/App.css";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/order" component={OrderPage} />
        <Route path="/feedback" component={FeedbackPage} />
        <Route path="/delivery-status" component={DeliveryStatusPage} />
        <Route path="/map" component={MapPage} />
        <Route path="/inventory" component={InventoryPage} />
        <Route path="/calendar" component={CalendarPage} />
      </Switch>
    </div>
    </ChakraProvider>
  );
}

export default App;
