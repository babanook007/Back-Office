import './NavBar.css'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useSidebar } from '../../context/SidebarProvider'

export default function CustomNavBar() {

  const { toggleSideBar } = useSidebar();

  return (
    <nav className="Nav-Container">
      <RxHamburgerMenu size={30} className='hamburger' onClick={toggleSideBar}/>
    </nav>
  )
}
