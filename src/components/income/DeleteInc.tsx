import { deleteIncome, fetchUserData, IncomeType} from "@/lib/features/userSlice"
import { useAppDispatch } from "@/lib/hook"
import { Bounce, toast } from "react-toastify"

type DeleteTypes = {
    setOpenDelete : (openUpdate : boolean)=>void,
    storeSelectedItem : IncomeType | null,
    setUpdateDeleteTab : (updateDeleteTab : boolean)=>void
}


export default function DeleteInc({setUpdateDeleteTab , setOpenDelete , storeSelectedItem} : DeleteTypes) {
    const dispatch = useAppDispatch();

    const handleDeleteDispatch = async () =>{
        await dispatch(deleteIncome(storeSelectedItem))
        await dispatch(fetchUserData()).then(()=>{
          toast.success('Deleted!', {
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
          toast.error('Error. Could not be deleted...', {
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
    }
  return (
    <div className="w-full h-full fixed z-30 inset-0 bg-black/50 flex justify-center items-center">

    <div className="bg-white w-[50%] h-[40%] flex flex-col gap-5 justify-center items-center relative">
      <span onClick={()=>{
          setOpenDelete(false)
          setUpdateDeleteTab(false)
          }} className="absolute right-5 top-5 text-3xl font-semibold cursor-pointer">&times;</span>
      <h1 className="font-sans font-extralight text-xl">Are you sure you want to delete this Income entry?</h1>

      <div className="flex gap-5 justify-center items-center">
      <button onClick={handleDeleteDispatch} className="rounded-xl shadow-2xl text-white bg-green-500 px-3 py-2 font-sans font-bold cursor-pointer hover:bg-green-400">Yes</button>

      <button onClick={()=>{
          setOpenDelete(false)
          setUpdateDeleteTab(false)
          }} className="rounded-xl shadow-2xl text-white bg-red-500 px-3 py-2 font-sans font-bold cursor-pointer hover:bg-red-400">No</button>
      </div>
    </div>

</div>
  )
}