import Account from "./components/account";
import Chart from "./components/chart";
import Styles from './App.module.scss'

function App() {
  return (
    <div className={Styles.App}>
      <div className={Styles.account}>
        <Account />
      </div>
      <div className={Styles.chart}>
        <Chart />
      </div>
    </div>
  );
}

export default App;
