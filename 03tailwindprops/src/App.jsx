import { useState } from 'react';
import './App.css';
import Card from './Components/Card'; // Capitalized import

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl">
        Tailwind test
      </h1>

      {/* Using Card component */}
      <Card
        image="https://media1.giphy.com/media/z8n8dWgQ0mgEIyzlmV/giphy.gif?cid=790b7611a5ba988db1bc7457636dd163c28af6f6dbc84a77&rid=giphy.gif&ct=g"
        alt="Giphy Animation"
        title="Available soon"
      />
    </>
  );
}

export default App;
