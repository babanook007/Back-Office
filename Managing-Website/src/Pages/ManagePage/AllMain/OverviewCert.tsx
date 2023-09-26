import OverviewTable from "../../../Components/tablecomponent/OverviewTable";
import style from "./AllMain.module.css";

export default function OverviewCert() {

  return (
    <div>
      <div className={style.titleContainer}>รายการใบรับรองทั้งหมด</div>
      <div className={style.inputContainer}>
      </div>
      <OverviewTable />
    </div>
  );
}