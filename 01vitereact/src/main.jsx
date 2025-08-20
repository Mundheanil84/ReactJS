

import React from "react";
import ReactDom from 'react-dom/client';
import App from './App';

// eslint-disable-next-line react-refresh/only-export-components
function MyApp(){
  return(
    <div>
      <h1>Custom App</h1>
    </div>
  )
}

ReactDom.createRoot(document.getElementById('root')).
render(

  MyApp()
)




