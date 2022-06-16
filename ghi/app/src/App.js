import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DeleteShoe from './DeleteShoe';
import MainPage from './MainPage';
import Nav from './Nav'; 
import ShoeForm from './ShoeForm';
import ShoesList from './ShoesList';

function App(props) {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route path="" element={<ShoesList shoes={props.shoes} /> } />
          </Route>
          <Route path="shoes">
            <Route path="new" element={<ShoeForm />} />
          </Route>
          <Route path="shoes">
            <Route path="delete" element={<DeleteShoe />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;

// #class based component to keep track of state 