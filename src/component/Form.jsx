import { useGlobalContext } from "../context";
import classes from "./style/Form.module.css";

const Form = () => {
  const {
    title,
    expenseList,
    setExpenseList,
    price,
    expenseDate,
    setTitle,
    setPrice,
    submitEditHandle,
    setDate,
    isEditing,
    titleRef,
    setAlert,
  } = useGlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !price || !expenseDate) {
      setAlert({ type: "danger", msg: "Wrong input!", display: true });
      setTitle("");
      setPrice("");
      setDate("");
    } else {
      const newItem = {
        id: expenseList.length + 1,
        title,
        price,
        date: new Date(expenseDate),
        isEditing: false,
      };
      setExpenseList([...expenseList, newItem]);
      setTitle("");
      setDate("");
      setPrice("");
      setAlert({ type: "succeed", msg: "Item has been added!", display: true });
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitHandler} className={classes.form}>
      <h4 className={classes.infoHeader}>Expense Info:</h4>
      <div className={classes.formControlInput}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          id="name"
          ref={titleRef}
          value={title}
          placeholder="Title"
          className={classes.titleInput}
          type="text"
        />
        <div className={classes.infoContainer}>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="USD"
            type="number"
            min="1"
            step="0.1"
          />
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            placeholder="Date"
            value={expenseDate}
            min="2019-01-01"
            max="2022-12-31"
          />
        </div>
      </div>
      <div className={classes.btnContainer}>
        {!isEditing ? (
          <button type="submit" className={classes.submitBtn}>
            Add Expense
          </button>
        ) : (
          <button
            type="submit"
            onClick={submitEditHandle}
            className={classes.submitBtn}
          >
            Submit editing
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
