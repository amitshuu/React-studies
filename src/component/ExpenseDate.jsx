import classes from "./style/ExpenseDate.module.css";

const ExpenseDate = ({ date }) => {
  const year = date.getFullYear().toString();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.toLocaleString("deafult", { day: "2-digit" });
  return (
    <article className={classes.dateContainer}>
      <p>{year}</p>
      <p>{month}</p>
      <p>{day}</p>
    </article>
  );
};

export default ExpenseDate;
