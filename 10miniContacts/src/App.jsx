import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import UserContextProvider from './context/UserContextProvider';

function App() {
  return (
    <UserContextProvider>
      <main className="app-container">
        <h1 className="app-title">React With Chai and share is important</h1>
        <div className="component-container">
          <Login />
          <Profile />
        </div>
      </main>
    </UserContextProvider>
  );
}

export default App; 