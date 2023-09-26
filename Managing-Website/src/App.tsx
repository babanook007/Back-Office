import { SidebarProvider } from './context/SidebarProvider';
import { Routes, Route } from 'react-router-dom';
import { CustomSideBar } from './Components/CustomSideBar/CustomSIdeBar';
import CustomNavBar from './Components/NavBar/CustomNavBar';
import ManagePage from './Pages/ManagePage/ManagePage';
import './App.css'

export default function App() {

  return (
    <SidebarProvider>
    <div>
      <CustomSideBar/>
      <div className="container">
      <CustomNavBar/>
      <Routes>
      <Route path="/manage/*" element={<ManagePage />} />
      </Routes>
      </div>
    </div>
    </SidebarProvider>
  )
}
