import { useGlobalContext } from "../context";
import classes from "./style/Expenses.module.css";
import ExpenseItem from "./ExpenseItem";
import ExpenseFilter from "./FilteredYear/ExpenseFilter";
const Expenses = () => {
  const { expenseList, filteredYearHandler, totalPrice } = useGlobalContext();

  return (
    <>
      {expenseList.length <= 0 ? (
        <h4 style={{ marginTop: "2rem" }}>Please add expenses details</h4>
      ) : (
        <section className={classes.expensesContainer}>
          <div className={classes.expensesHeader}>
            <h2>
              Expenses List:
              <div className={classes.underline}></div>
              <ExpenseFilter />
            </h2>
          </div>

          {filteredYearHandler.length > 0 ? (
            filteredYearHandler.map((item) => {
              return <ExpenseItem key={item.id} {...item} />;
            })
          ) : (
            <div className={classes.content}>
              <h4>No expenses found.</h4>
            </div>
          )}
        </section>
      )}

      {filteredYearHandler.length > 0 && (
        <div className={classes.totalContainer}>
          <h4>Total: {totalPrice}$</h4>
        </div>
      )}
    </>
  );
};

export default Expenses;
