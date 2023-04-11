import React, { useState } from "react";
import Styles from "./chart.module.scss";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import label from "../../Languages";

ChartJS.register(
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const { balance } = useSelector((state) => state);
  const [emiValue, setEmiValue] = useState(null);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: label("CHART_HEADER"),
      },
    },
  };

  let initialBalance = balance;
  let yLabel = [];

  let emi = emiValue;
  if (!emi) {
    emi = 1;
    initialBalance = 0;
  }
  let xaxis = Math.ceil(initialBalance / emi);
  let xLabel = [];
  for (let i = 0; i <= xaxis; i++) {
    xLabel.push(i);
  }
  let value = initialBalance;
  for (let i = 0; i <= xaxis; i++) {
    if (value < 0) {
      value = 0;
    }
    yLabel.push(value);
    value = value - emi;
  }

  const data = {
    labels: xLabel,
    datasets: [
      {
        label: "Balance payment",
        data: yLabel,
        backgroundColor: ["rgba(254, 0, 0, 1)"],
        borderWidth: 2,
      },
    ],
  };
  function calculate(e) {
    let premium = document.getElementById("emi").value;
    if (balance / premium > 200) {
      if (e.nativeEvent.inputType != "deleteContentBackward") {
        var bouncer = setTimeout(
          () =>
            Swal.fire({
              title: "Low emi",
              text: "Increase your premium",
              icon: "error",
            }),
          3000
        );
      }
    } else if (balance < 1) {
      Swal.fire({
        title: "No outstanding balance",
        icon: "error",
      });
    } else if (premium > balance) {
      Swal.fire({
        title: "premium must be less that balance",
        icon: "error",
      });
    } else {
      bouncer?.clearTimeout();
      setEmiValue(premium);
    }
  }

  return (
    <div>
      <div className="initial">
        <h1>
          {label("INIT_BALANCE")} : {balance}
        </h1>
        <div className="inputPayment">
          <p className="month">{label("MONTHLY_PAYMENT")}</p>

          <input type="number" id="emi" onChange={calculate} />
        </div>
      </div>
      <hr />
      <div className="graph"></div>
      <div className={Styles.chart}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Chart;
