import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import axios from "axios";
import { loginApi, regisApi } from "../../api/connection";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [regismodal, setregismodal] = useState(true);
  const [regisError, setReisError] = useState("");
  const [regisusername, setReisUsername] = useState("");
  const [regispassword, setRegisPassword] = useState("");
  const [regisemail, setRegisEmail] = useState("");

  const navigate = useNavigate();

  const handleUserInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(event.target.value);
  };
  const handlePassInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };
  const openRegisModal = () => {
    setregismodal(true);
    setReisError("");
  };
  const closeRegisModal = () => {
    setregismodal(false);
  };

  const handleLogin = async () => {
    try {
      const data = {
        username,
        password,
      };
      const response = await axios.post(`${loginApi}`, data);
      if (response.status === 200) {
        console.log("เข้าสู่ระบบสำเร็จ");
        navigate("/main");
      } else if (response.status === 400) {
        setError("Username หรือ Password ผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในระหว่างการล็อคอิน");
    }
  };

  const regisUsernameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReisUsername(event.target.value);
  };
  const regisPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisPassword(event.target.value);
  };
  const regisEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisEmail(event.target.value);
  };
  const handleRegister = async () => {
    try {
      if (!regisusername || !regispassword || !regisemail) {
        setReisError("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }
      const data = {
        username: regisusername,
        password: regispassword,
        email: regisemail,
      };

      const response = await axios.post(`${regisApi}`, data);
      if (response.status === 201) {
        closeRegisModal();
        console.log(response);
      }
    } catch (error) {
        setReisError("Username หรือ Email ถูกใช้งานไปแล้ว");
    }
  };

  return (
    <div className={style.container}>
      {!regismodal && (
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
            <p onClick={openRegisModal}>สมัครสมาชิก</p>
            <div className={style.loginButton} onClick={handleLogin}>
              <p>เข้าสู่ระบบ</p>
            </div>
          </div>
          <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
        </div>
      )}

      {regismodal && (
        <div className={style.registerContainer}>
          <div className={style.closeButton}>
            <p onClick={closeRegisModal}>X</p>
          </div>
          <div className={style.userContainer}>
            <div className={style.userText}>
              <p className={style.inputText}>User Name</p>
            </div>
            <input
              type="text"
              className={style.input}
              id="usernameRegis"
              onChange={regisUsernameInputChange}
              placeholder="ชื่อผู้ใช้"
            />
          </div>
          <div className={style.userContainer}>
            <div className={style.userText}>
              <p className={style.inputText}>email</p>
            </div>
            <input
              type="text"
              className={style.input}
              id="emailRegis"
              onChange={regisEmailInputChange}
              placeholder="อีเมล"
            />
          </div>
          <div className={style.userContainer}>
            <div className={style.userText}>
              <p className={style.inputText}>Password</p>
            </div>
            <input
              type="password"
              className={style.input}
              id="passwordRegis"
              onChange={regisPasswordInputChange}
              placeholder="รหัสผ่าน"
            />
          </div>
          <div
            className={style.loginButton}
            onClick={handleRegister}
            style={{ marginTop: "15px" }}
          >
            ยืนยันการสมัครสมาชิก
          </div>
          <p style={{ color: "red", marginTop: "15px" }}>{regisError}</p>
        </div>
      )}
    </div>
  );
}
