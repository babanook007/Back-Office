import { useState, useEffect } from "react";
import "./OverviewTable.module.css";
import {
  getEquipment,
  updateEquipment,
  deleteEquipments,
} from "../../api/connection";
import { useSelector } from "react-redux";
import axios from "axios";

interface Equipment {
  _id: string;
  eq_name: string;
  eq_direction: string;
  eq_status: string;
}

export default function OverviewTable() {
  const [data, setData] = useState<Equipment[]>([]);
  const [editingEquipment, setEditingEquipment] = useState<any>(null);
  const [editToggle, setEditToggle] = useState(false);

  const handleEdit = () => {
    setEditToggle(true);
  };

  const handleUpdateData = () => {
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .get(getEquipment, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const token = useSelector((state: any) => state.auth.token);
  useEffect(() => {
    if (!token) {
      return;
    }
    const config = {
      headers: {
        "x-access-token": token,
      },
    };
    axios
      .get(getEquipment, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleEditClick = (equipment: any) => {
    setEditingEquipment(equipment);
    handleEdit();
  };

  const handleSaveClick = (equipmentId: string) => {
    const updatedEquipmentData = {
      eq_name: editingEquipment.eq_name,
      eq_direction: editingEquipment.eq_direction,
      eq_status: editingEquipment.eq_status,
    };

    const config = {
      headers: {
        "x-access-token": token,
      },
    };

    axios
      .put(`${updateEquipment}/${equipmentId}`, updatedEquipmentData, config)
      .then((response) => {
        console.log("อัปเดตข้อมูลสำเร็จ:", response.data);
        setEditToggle(false);
        axios
          .get(getEquipment, config)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
      });
  };

  const handleDeleteClick = (equipmentId: string) => {
    if (window.confirm("คุณต้องการลบอุปกรณ์นี้ใช่หรือไม่?")) {
      deleteEquipment(equipmentId);
    }
  };

  const deleteEquipment = (equipmentId: string) => {
    axios
      .delete(`${deleteEquipments}/${equipmentId}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setData((prevData) =>
          prevData.filter((item) => item._id !== equipmentId)
        );
        console.log("ลบอุปกรณ์สำเร็จ:", response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการลบอุปกรณ์:", error);
      });
  };

  return (
    <div>
      <div
        onClick={handleUpdateData}
        style={{ cursor: "pointer", color: "red" }}
      >
        รีเฟรชข้อมูล
      </div>
      <table>
        <thead>
          <tr>
            <th>รหัสอุปกรณ์</th>
            <th>ชื่ออุปกรณ์</th>
            <th>ที่ตั้ง</th>
            <th>สถานะ</th>
            <th>แก้ไข</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>
                {editToggle === true ? (
                  <input
                    type="text"
                    value={editingEquipment.eq_name}
                    onChange={(e) =>
                      setEditingEquipment({
                        ...editingEquipment,
                        eq_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.eq_name
                )}
              </td>
              <td>
                {editToggle === true ? (
                  <input
                    type="text"
                    value={editingEquipment.eq_direction}
                    onChange={(e) =>
                      setEditingEquipment({
                        ...editingEquipment,
                        eq_direction: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.eq_direction
                )}
              </td>
              <td>
                {editToggle === true ? (
                  <input
                    type="text"
                    value={editingEquipment.eq_status}
                    onChange={(e) =>
                      setEditingEquipment({
                        ...editingEquipment,
                        eq_status: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.eq_status
                )}
              </td>
              <td>
                {editToggle === true ? (
                  <button onClick={() => handleSaveClick(item._id)}>
                    บันทึก
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(item)}>แก้ไข</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteClick(item._id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
