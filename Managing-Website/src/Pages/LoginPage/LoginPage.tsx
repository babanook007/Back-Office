// LoginPage.tsx

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import style from "./Login.module.css";
import axios from 'axios'; // นำเข้า Axios

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePassInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      // สร้างตัวแปรสำหรับส่งข้อมูล
      const data = {
        username,
        password,
      };

      // ใช้ Axios เพื่อทำการล็อคอินผู้ใช้
      const response = await axios.post('http://localhost:3000/login', data);
      
      // ตรวจสอบรหัส HTTP
    if (response.status === 200) {
      console.log("เข้าสู่ระบบสำเร็จ");
      navigate("/main"); // เปลี่ยนเส้นทางไปยังหน้า Main หากล็อคอินสำเร็จแล้ว
    } else if (response.status === 400){
      setError('Username หรือ Password ผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
  } catch (error) {
    setError('เกิดข้อผิดพลาดในระหว่างการล็อคอิน');
  }
  };

  return (
    <div className={style.container}>
      <div className={style.loginContainer}>
        <div className={style.userContainer}>
          <div className={style.userText}>
            <p className={style.inputText}>User Name</p>
          </div>
          <input
            type="text"
            className={style.input}
            id="usernameInput"
            onChange={handleUserInputChange}
            placeholder="ชื่อผู้ใช้งาน หรืออีเมล"
          />
        </div>
        <div className={style.userContainer}>
          <div className={style.userText}>
            <p className={style.inputText}>Password</p>
          </div>
          <input
            type="password"
            className={style.input}
            id="passwordInput"
            onChange={handlePassInputChange}
            placeholder="รหัสผ่าน"
          />
        </div>
        <div className={style.buttomContainer}>
          <div className={style.loginButton} onClick={handleLogin}>
            <p>เข้าสู่ระบบ</p>
          </div>
        </div>
        <p style={{color: "red" , marginTop: "15px"}}>{error}</p>
      </div>
    </div>
  );
}
