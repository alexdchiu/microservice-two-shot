import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadShoesandHats() {
  const shoeResponse = await fetch('http://localhost:8080/shoes/');
  const hatResponse = await fetch('http://localhost:8090/hats/');
  if (shoeResponse.ok && hatResponse.ok) {
    const shoeData = await shoeResponse.json() 
    const hatData = await hatResponse.json()
    console.log('shoeData from index.js: ', shoeData)
    console.log('hatData from index.js: ', hatData)
    root.render(
      <React.StrictMode>
        <App shoes={shoeData.shoes} hats={hatData.hats} />
      </React.StrictMode>
    );
  } else {
    console.error('shoeData:', shoeResponse);
    console.error('hatData:', hatResponse);
  }
}
loadShoesandHats();
