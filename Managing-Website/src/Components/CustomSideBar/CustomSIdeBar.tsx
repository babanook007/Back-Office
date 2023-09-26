import "./CustomSIdeBar.css";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useSidebar } from "../../context/SidebarProvider";
import { useSelector } from "react-redux";
import { insertEquipments } from "../../api/connection";
import axios from "axios";
const logo = "https://media.istockphoto.com/id/1145909008/vector/man-with-folded-arms.jpg?s=612x612&w=0&k=20&c=jmd3ZJvoRG6YG0w7nRTMbzcnW4OQFeThb1JhhBdM5CM=";

const CustomSideBar = () => {
  const { toggleSideBar } = useSidebar();
  const { openSideBar } = useSidebar();
  const [drop1DownOpen, setDropDown1] = useState(false);

  const toggleDropDown1 = () => {
    setDropDown1((prevdropDownOpen) => !prevdropDownOpen);
    if (openSideBar == true) {
      toggleSideBar();
    }
  };

  const closeDropdown = () => {
    setDropDown1(false);
  };

  useEffect(() => {
    if (drop1DownOpen == true && openSideBar == true) {
      closeDropdown();
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEquipmentData, setNewEquipmentData] = useState({
    eq_name: '',
    eq_direction: '',
    eq_status: '',
  });


  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const token = useSelector((state: any) => state.auth.token);
  const addEquipment = () => {
    axios
      .post(`${insertEquipments}`, newEquipmentData, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        console.log('เพิ่มข้อมูลอุปกรณ์เสร็จสิ้น:', response.data);
        closeModal();
        setNewEquipmentData({
          eq_name: '',
          eq_direction: '',
          eq_status: '',
        });
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูลอุปกรณ์:', error);
      });
  };
  

  return (
    <nav className={`sidebar ${openSideBar ? "close" : ""}`}>
      <header>
      <span className="image">
          <img src={logo} alt="logo"></img>
        </span>
        <div className="image-text">
          <div className="header-text">
            <span className="name">ระบบบริหาร</span>
            <span className="profession">Back-office</span>
          </div>
        </div>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-link">
              <li
                className={`nav-link1 ${drop1DownOpen ? "drop" : ""}`}
                onClick={toggleDropDown1}
              >
                <a className="drop-menu" id="">
                  <div className="content-size-fixing" />
                  <IoSettingsOutline size={20} className="icon" />
                  <span className="nav-text">ManageData</span>
                  <IoMdArrowDropdown
                    size={20}
                    className={`drop-down-icon ${
                      drop1DownOpen ? "rotate-180" : ""
                    }`}
                  />
                </a>
                {drop1DownOpen && (
                  <div className="drop-down-container">
                    <div className="drop-down-content" onClick={openModal}>
                      <span className="nav-text-conten">
                        เพิ่มอุปกรณ์
                      </span>
                    </div>
                  </div>
                )}
              </li>
              
            </ul>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>เพิ่มอุปกรณ์</h2>
            <label>ชื่ออุปกรณ์:</label>
            <input
              type="text"
              value={newEquipmentData.eq_name}
              onChange={(e) =>
                setNewEquipmentData({
                  ...newEquipmentData,
                  eq_name: e.target.value,
                })
              }
            />
            <label>ที่ตั้ง:</label>
            <input
              type="text"
              value={newEquipmentData.eq_direction}
              onChange={(e) =>
                setNewEquipmentData({
                  ...newEquipmentData,
                  eq_direction: e.target.value,
                })
              }
            />
            <label>สถานะ:</label>
            <input
              type="text"
              value={newEquipmentData.eq_status}
              onChange={(e) =>
                setNewEquipmentData({
                  ...newEquipmentData,
                  eq_status: e.target.value,
                })
              }
            />
            <button onClick={addEquipment}>เพิ่ม</button>
            <button onClick={closeModal}>ปิด</button>
          </div>
        </div>
      )}
      <style>
        {`
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
          }
          
          .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </nav>
  );
};

export { CustomSideBar };
