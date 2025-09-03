
import React from 'react';
import logo from './logo.svg';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex flex-col items-center justify-center min-h-screen">
        <img 
          src={logo} 
          className="h-64 w-64 animate-spin-slow" 
          alt="logo" 
        />
        <p className="text-xl mt-8 font-light">
          Edit <code className="bg-gray-800 px-2 py-1 rounded">src/App.tsx</code> and save to reload.
        </p>
        <a
          className="mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-lg"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;