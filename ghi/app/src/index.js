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
  const response = await fetch('http://localhost:8080/shoes/');
  if (response.ok) {
    const data = await response.json() 
    console.log(data)
    root.render(
      <React.StrictMode>
        <App shoes={data.shoes} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
}
loadShoesandHats();
