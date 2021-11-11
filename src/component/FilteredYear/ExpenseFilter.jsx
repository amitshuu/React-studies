import classes from "./ExpenseFilter.module.css";
import { useGlobalContext } from "../../context";

const ExpenseFilter = () => {
  const { setSelectedYear, selectedYear } = useGlobalContext();

  const onSelectYearHandler = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <>
      <select
        value={selectedYear}
        onChange={onSelectYearHandler}
        className={classes.filter}
      >
        <option disabled>Filter by year</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>
    </>
  );
};

export default ExpenseFilter;
