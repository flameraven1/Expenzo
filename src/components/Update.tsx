import { useAppDispatch } from "@/lib/hook";
import { useState } from "react";
import { fetchUserData, updateTransaction, TransactionType, IncomeType, ExpenseType } from "@/lib/features/userSlice";
import { Bounce, toast } from "react-toastify";

type UpdateTypes = {
  openUpdate: boolean;
  setOpenUpdate: (openUpdate: boolean) => void;
  storeSelectedItem: TransactionType | null;
  setUpdateDeleteTab: (updateDeleteTab: boolean) => void;
};

function isIncome(data: unknown): data is IncomeType {
  return (
    typeof data === "object" &&
    data !== null &&
    "income" in data &&
    typeof (data as any).income?.source !== "undefined"
  );
}

function isExpense(data: unknown): data is ExpenseType {
  return (
    typeof data === "object" &&
    data !== null &&
    "expense" in data &&
    typeof (data as any).expense?.category !== "undefined"
  );
}


export default function Update({
  setOpenUpdate,
  setUpdateDeleteTab,
  storeSelectedItem,
}: UpdateTypes) {
  const item = storeSelectedItem as TransactionType;
  const dispatch = useAppDispatch();

  const getSourcePlaceholder = () => {
    if (isIncome(item)) {
      return item.income?.source ?? "";
    }
    if (isExpense(item)) {
      return item.expense?.category ?? "";
    }
    return "";
  };

  const getAmountPlaceholder = () => {
    if (isIncome(item)) {
      return item.income?.amount?.toString() ?? "";
    }
    if (isExpense(item)) {
      return item.expense?.amount?.toString() ?? "";
    }
    return "";
  };

  const [sendValues, setSendValues] = useState({
    sourceCat: "",
    amount: 0,
    date: new Date(),
    _id: item._id || "",
    type: item.type || "",
  });

  const handleClick = async () => {
    await dispatch(updateTransaction(sendValues));
    await dispatch(fetchUserData()).then(()=>{
      toast.success('Updated!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        })
    }).catch(()=>{
      toast.error('Error. Could not be updated...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    })
  };

  return (
    <div className="fixed w-full h-full z-30 inset-0 bg-black/50 flex justify-center items-center">
      <span
        onClick={() => {
          setOpenUpdate(false);
          setUpdateDeleteTab(false);
        }}
        className="absolute right-5 top-5 text-3xl font-semibold cursor-pointer"
      >
        &times;
      </span>

      <div className="bg-white w-[50%] h-[50%]">
        <h1>Update</h1>

        <form className="w-full h-full flex flex-col justify-center items-center gap-5 ">
          <div className="w-full h-[85%] flex flex-col justify-center items-center ">
            <div className="flex flex-col w-[90%] h-[30%] justify-center items-start">
              <label htmlFor="source">{isIncome(item.income) ? "Source" : "Category"}</label>
              <input
                onChange={(e) => setSendValues({ ...sendValues, sourceCat: e.target.value })}
                className="w-full outline-1 outline-gray-300 selection:outline-blue-500 selection:outline-1 p-3"
                type="text"
                name="source"
                placeholder={getSourcePlaceholder()}
              />
            </div>

            <div className="flex flex-col w-[90%] h-[30%] justify-center items-start">
              <label htmlFor="amount">Amount</label>
              <input
                onChange={(e) => setSendValues({ ...sendValues, amount: Number(e.target.value) })}
                className="w-full outline-1 outline-gray-300 selection:outline-blue-500 selection:outline-1 p-3"
                type="number"
                name="amount"
                placeholder={getAmountPlaceholder()}
              />
            </div>

            <div className="flex flex-col w-[90%] h-[30%] justify-center items-start">
              <label htmlFor="date">Date</label>
              <input
                onChange={(e) => setSendValues({ ...sendValues, date: new Date(e.target.value) })}
                className="w-full outline-1 outline-gray-300 selection:outline-blue-500 selection:outline-1 p-3"
                type="date"
                name="date"
                defaultValue={
                  isIncome(item)
                    ? new Date(item.income?.date ?? "").toISOString().split("T")[0]
                    : isExpense(item)
                    ? new Date(item.expense?.date ?? "").toISOString().split("T")[0] 
                    : ""
                }
              />
            </div>
          </div>

          <div className="w-full h-[15%] flex justify-center items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              className="cursor-pointer hover:bg-blue-400 w-[50%] bg-blue-500 px-3 py-2 text-white font-sans font-bold text-center"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
