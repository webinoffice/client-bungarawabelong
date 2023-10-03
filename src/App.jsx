import './App.css';
import HomePage from './assets/pages/homePage';
import Splash from './assets/pages/splash';
import { HashRouter,Routes, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FavouritePage from './assets/pages/favouritePage';
import SettingsPage from './assets/pages/settingsPage';
import ProductDetailPage from './assets/pages/productDetailPage';
import ProductPage from './assets/pages/productPage';
import ShopDetailPage from './assets/pages/shopDetailPage';
import LoginPage from './assets/pages/loginPage';
import ProfilePage from './assets/pages/profilePage';
import AddProductPage from './assets/pages/addProductPage';
import NotificationPage from './assets/pages/notificationPage';
import ProductSharePage from './assets/pages/productSharePage';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import ProductSearchPage from './assets/pages/productSearchPage';
import ProductEditPage from './assets/pages/productEditPage';
import ProductEditDetailPage from './assets/pages/productEditDetailPage';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#00351b',
    },
    secondary: {
      main: '#00BF63',
    },
    error: {
      main: '#00793F',
    },
    merah: {
      main: '#952323',
    },
    pink: {
      main: '#D988B9',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/land" element={<Splash/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/favourite" element={<FavouritePage/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path='/product' element={<ProductPage/>}/>
          <Route path='/product/:search' element={<ProductSearchPage/>}/>
          <Route path='/detail' element={<ProductDetailPage/>}/>
          <Route path='/share-detail/:product_id' element={<ProductSharePage/>}/>
          <Route path='/shop' element={<ShopDetailPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/add-product" element={<AddProductPage/>}/>
          <Route path="/edit-product" element={<ProductEditPage/>}/>
          <Route path="/edit-product/detail" element={<ProductEditDetailPage/>}/>
          <Route path="/notification" element={<NotificationPage/>}/>

        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
