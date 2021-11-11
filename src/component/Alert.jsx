import { useGlobalContext } from "../context";
import classes from "./style/Alert.module.css";
import { useEffect } from "react";

const Alert = ({ type, msg }) => {
  const { expenseList, removeAlert } = useGlobalContext();
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [expenseList, removeAlert]);
  return (
    <>
      <div className={classes[`alert${type}`]}>{msg}</div>
    </>
  );
};

export default Alert;
