import {
  Chart as Chartjs,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2"
import { EntireUserDataTypes } from "@/lib/features/userSlice"

interface DataType {
  filterForYear: string,
  entireUserData: EntireUserDataTypes
}

Chartjs.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartExpense({ filterForYear, entireUserData }: DataType) {
  const filteredExpense = entireUserData.expense.filter(item => {
    const itemYear = new Date(item.date).getFullYear().toString();
    return itemYear === filterForYear;
  });

  const AllExpenseCategories = filteredExpense.map(item => item.category);
  const AllExpenseAmounts = filteredExpense.map(item => Number(item.amount));

  return (
    <Pie
      options={{ responsive: true, maintainAspectRatio: false }}
      data={{
        labels: AllExpenseCategories,
        datasets: [
          {
            label: "Expense",
            data: AllExpenseAmounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)"
            ],
          }
        ],
      }}
    />
  );
}
