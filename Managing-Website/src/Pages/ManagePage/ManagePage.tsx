import style from './Manage.module.css'
import { Routes, Route } from 'react-router-dom'
import AllCert from './AllMain/AllCert'

export default function ManagePage() {
  return (
    <div className={style.container}>
        <Routes>
            <Route path='/all/*' element={<AllCert/>}></Route>
        </Routes>
    </div>
  )
}
