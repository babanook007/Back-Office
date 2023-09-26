import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage/LoginPage.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename=''>
    <Provider store={store}>
    <Routes>
      <Route path="/main/*" element={<App/>}/>
      <Route path="/" element={<LoginPage />} />
    </Routes>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)

