import {Home, Purchases, Login, ProductsDetail} from './pages'
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {LoadingScreen, NavBar, ProtectedRoutes} from './components';
import {useSelector} from 'react-redux';

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <NavBar/>
      <Container>
        {isLoading && <LoadingScreen/>}
        <LoadingScreen/>
        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path ="/products/:id" element={<ProductsDetail/>}/>
          <Route path ="/login" element={<Login/>}/>

          <Route element={<ProtectedRoutes/>}>
              <Route path="/purchases" element={<Purchases/>}/>
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
