import ExpenseDate from "./ExpenseDate";
import classes from "./style/ExpenseItem.module.css";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useGlobalContext } from "../context";

const ExpenseItem = ({ id, title, date, price, isEditing }) => {
  const { deleteHandle, editHandle, filteredYearHandler } = useGlobalContext();

  return (
    <>
      <article
        key={id}
        className={isEditing ? classes.itemContainerr : classes.itemContainer}
      >
        {filteredYearHandler.length < 0 && (
          <h3>There are no expenses in the year you selected</h3>
        )}
        <ExpenseDate date={date} />
        <div className={classes.wrap}>{title}</div>
        <h4>{price}$</h4>
        <div>
          <MdDelete
            onClick={() => deleteHandle(id)}
            className={
              isEditing ? classes.deleteIconOnEdit : classes.deleteIcon
            }
          />
          <MdModeEditOutline
            onClick={() => editHandle(id)}
            className={
              isEditing ? classes.deleteIconOnEdit : classes.deleteIcon
            }
          />
        </div>
      </article>
    </>
  );
};

export default ExpenseItem;
