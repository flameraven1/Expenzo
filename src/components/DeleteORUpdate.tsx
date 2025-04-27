import { useState } from "react"
import Update from "@/components/Update";
import { TransactionType } from "@/lib/features/userSlice";
import Delete from "./Delete";

type TypeForQuestionTab = {
  updateDeleteTab : boolean,
  storeSelectedItem : TransactionType | null,
  setUpdateDeleteTab : (updateDeleteTab : boolean)=>void
}

export default function DeleteORUpdate({setUpdateDeleteTab , storeSelectedItem} : TypeForQuestionTab) {
  const [openUpdate , setOpenUpdate] = useState(false);
  const [openDelete , setOpenDelete] = useState(false);

  const handleClick = () =>{
    setOpenUpdate(true)
  }

  return (

    openUpdate ? <Update openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} setUpdateDeleteTab={setUpdateDeleteTab} storeSelectedItem={storeSelectedItem}/> : openDelete ? <Delete storeSelectedItem={storeSelectedItem} setOpenDelete={setOpenDelete} setUpdateDeleteTab={setUpdateDeleteTab} /> :

    <div className="w-full h-full fixed z-30 inset-0 bg-black/50 flex justify-center items-center">

        <div className="bg-white w-[50%] h-[40%] flex flex-col gap-5 justify-center items-center relative">
          <span onClick={()=>setUpdateDeleteTab(false)} className="absolute right-5 top-5 text-3xl font-semibold cursor-pointer">&times;</span>
          <h1 className="font-sans font-extralight text-xl">Do you want to update or delete this entry?</h1>

          <div className="flex gap-5 justify-center items-center">
          <button onClick={handleClick} className="rounded-xl shadow-2xl text-white bg-green-500 px-3 py-2 font-sans font-bold cursor-pointer hover:bg-green-400">Update</button>

          <button onClick={()=>setOpenDelete(true)} className="rounded-xl shadow-2xl text-white bg-red-500 px-3 py-2 font-sans font-bold cursor-pointer hover:bg-red-400">Delete</button>
          </div>
        </div>

    </div>
  )
}
