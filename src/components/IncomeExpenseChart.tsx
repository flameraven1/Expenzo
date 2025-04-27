import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { EntireUserDataTypes } from "@/lib/features/userSlice";

interface DataType {
  entireUserData: EntireUserDataTypes;
  filterForYear: string;
}

Chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function IncomeExpenseChart({ entireUserData, filterForYear }: DataType) {
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getIncomeAmountArray = Array(12).fill(0);
  const filteringIncomeYear = entireUserData.income.filter(
    (item) => new Date(item.date).getFullYear().toString() === filterForYear
  );
  filteringIncomeYear.forEach((element) => {
    const monthIndex = new Date(element.date).getMonth();
    getIncomeAmountArray[monthIndex] += element.amount;
  });

  const getExpenseAmountArray = Array(12).fill(0);
  const filteringExpenseYear = entireUserData.expense.filter(
    (item) => new Date(item.date).getFullYear().toString() === filterForYear
  );
  filteringExpenseYear.forEach((element) => {
    const monthIndex = new Date(element.date).getMonth();
    getExpenseAmountArray[monthIndex] += element.amount;
  }) 
    return (
      <Bar options={{responsive : true ,  maintainAspectRatio: false}}
        data={{
          labels: monthOrder,
          datasets: [
            {
              label: "Income",
              data: getIncomeAmountArray,
              backgroundColor: "rgba(75, 192, 192, 0.7)",
            },
            {
              label: "Expense",
              data: getExpenseAmountArray,
              backgroundColor: "rgba(255, 99, 132, 0.7)",
            },
          ],
        }}
      />
    );
  }