import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import CreateHatForm from './CreateHat';
// import HatDetails from './HatDetails';

function App(props) {
  // if (props.hats === undefined) {
  //   return null
  // }
  console.log(props)
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats" element={<HatsList hats={props.hats}/>} />
          <Route path="/hats/new" element={<CreateHatForm />} />
          {/* <Route path="/hats/:id" element={<HatDetails />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
