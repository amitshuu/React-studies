import React, { useContext, useEffect, useRef, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [expenseList, setExpenseList] = useState([]);
  const [title, setTitle] = useState("");
  const [expenseDate, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedItemID, setEditedItemID] = useState(null);
  const [alert, setAlert] = useState({ display: false, msg: "", type: "" });
  const [selectedYear, setSelectedYear] = useState("2021");

  const titleRef = useRef();

  const deleteHandle = (id) => {
    setExpenseList(expenseList.filter((item) => item.id !== id));
    setAlert({ display: true, msg: "Item has been deleted!", type: "succeed" });

    if (isEditing) {
      setTitle("");
      setPrice("");
      setDate("");
    }

    setIsEditing(false);
  };

  const dateTranslate = (date) => {
    const year = date.getFullYear().toString();
    const month = date.getMonth();
    const day = date.toLocaleString("deafult", { day: "2-digit" });

    return [year, month, day].join("-"); // 20211111 to 2021-11-11
  };

  const editHandle = (id) => {
    const selectedItem = expenseList.find((item) => item.id === id);
    setIsEditing(true);
    setEditedItemID(id);
    setTitle(selectedItem.title);
    setPrice(selectedItem.price);
    setDate(dateTranslate(selectedItem.date));
    selectedItem.isEditing = true;
  };

  const submitEditHandle = (e) => {
    e.preventDefault();

    setAlert({ type: "succeed", msg: "Item has been edited!", display: true });

    if (price <= 0) {
      setAlert({
        type: "danger",
        msg: "Value can not be zero or below!",
        display: true,
      });
    } else if (title <= 0) {
      setAlert({
        type: "danger",
        msg: "Value can not be empty!",
        display: true,
      });
    } else {
      setExpenseList(
        expenseList.map((item) => {
          if (item.id === editedItemID) {
            return {
              ...item,
              title,
              price,
              date: new Date(expenseDate),
              isEditing: false,
            };
          }
          return item;
        })
      );
      setTitle("");
      setPrice("");
      setDate("");
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      titleRef.current.focus();
    }
  }, [isEditing]);

  const removeAlert = (type = "", msg = "", display = false) => {
    setAlert({ type, msg, display });
  };

  const filteredYearHandler = expenseList.filter((item) => {
    return item.date.getFullYear().toString() === selectedYear;
  });

  const totalPrice = filteredYearHandler.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <AppContext.Provider
      value={{
        editHandle,
        editedItemID,
        setEditedItemID,
        submitEditHandle,
        deleteHandle,
        expenseList,
        titleRef,
        setExpenseList,
        title,
        expenseDate,
        price,
        setTitle,
        setDate,
        setPrice,
        isEditing,
        alert,
        setAlert,
        removeAlert,
        selectedYear,
        setSelectedYear,
        filteredYearHandler,
        totalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
