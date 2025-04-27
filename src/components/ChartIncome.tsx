import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { EntireUserDataTypes } from "@/lib/features/userSlice";

interface DataType {
  filterForYear: string;
  entireUserData: EntireUserDataTypes;
}

Chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartIncome({ filterForYear, entireUserData }: DataType) {
  const filteredIncome = entireUserData.income.filter(item => {
    const year = new Date(item.date).getFullYear().toString();
    return year === filterForYear;
  });

  const AllIncomeSources = filteredIncome.map(item => item.source);
  const AllIncomeAmounts = filteredIncome.map(item => Number(item.amount));

  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Income Sources - ${filterForYear}`
          },
          legend: {
            display: false
          }
        }
      }}
      data={{
        labels: AllIncomeSources,
        datasets: [
          {
            label: "Income",
            data: AllIncomeAmounts,
            backgroundColor: "rgba(75, 192, 192, 0.7)",
          }
        ],
      }}
    />
  );
}
