import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import DeliveryStatusPage from './pages/DeliveryStatusPage';
import MapPage from './pages/MapPage';
import InventoryPage from './pages/InventoryPage';
import CalendarPage from './pages/CalendarPage';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import PartnerInfo from './pages/PartnerPage';

const theme = extendTheme({
  colors: {
    orange: {
      500: "#FF7A00",
    },
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <NavBar userRole="partner" />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/order" component={OrderPage} />
          <Route path="/delivery-status" component={DeliveryStatusPage} />
          <Route path="/map" component={MapPage} />
          <Route path="/inventory" component={InventoryPage} />
          <Route path="/calendar" component={CalendarPage} />
          <Route path="/profile" component={PartnerInfo} />
        </Switch>
      </div>
    </ChakraProvider>
  );
}

export default App;
