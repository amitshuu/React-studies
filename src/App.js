import Expenses from "./component/Expenses";
import Form from "./component/Form";
import Alert from "./component/Alert";
import { useGlobalContext } from "./context";
const App = () => {
  const { alert } = useGlobalContext();
  return (
    <div className="main">
      <h1 className="title">
        Expense Tracker
        <div className="underline"></div>
      </h1>
      {alert.display && <Alert {...alert} />}
      <Form />
      <Expenses />
    </div>
  );
};

export default App;
