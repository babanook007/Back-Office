import { useState, useEffect } from "react";
import style from "./AllMain.module.css";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import OverviewCert from "./OverviewCert";

export default function AllCert() {
  const [allcert, setAllcert] = useState(false);
  const [rejectCert, setRejectCert] = useState(false);
  const [waitingCert, setWaitingCert] = useState(false);

  const Location = useLocation();
  useEffect(() => {
    if (Location.pathname === "/main/manage/" && !allcert) {
      setAllcert(true);
      setRejectCert(false);
      setWaitingCert(false);
    } else if (
      Location.pathname.startsWith("/main/manage/reject") &&
      !rejectCert
    ) {
      setAllcert(false);
      setRejectCert(true);
      setWaitingCert(false);
    } else if (
      Location.pathname.startsWith("/main/manage/waiting") &&
      !waitingCert
    ) {
      setAllcert(false);
      setRejectCert(false);
      setWaitingCert(true);
    }
  }, [Location.pathname]);

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <Routes>
          <Route path="/" element={<OverviewCert />} />
        </Routes>
      </div>
    </div>
  );
}
