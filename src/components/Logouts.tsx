import React from 'react'
import Exit from "../assets/svgs/exit.svg";
type SetStateAction<S> = S | ((prevState: S) => S);
interface IProps{
  setSwitch:React.Dispatch<SetStateAction<boolean>>,
  Switch:any
}
const Logouts:React.FC<IProps> = ({setSwitch,Switch}) => {
  return (
    <div>
          <div className="fixed top-0 left-0 bg-[#87888d69] z-30 w-full h-full">
        <div className="flex justify-center items-center h-full">
          <div className="w-[400px] bg-contentBackground px-2 py-2 rounded-xl">
            <div className="flex  py-3 px-2 justify-between">
              <div className="">
                <h1></h1>
              </div>
              <div className="">
                <h1 className="text-mainTextColor tracking-[-0.01em] text-center font-[500] font-[SF-Pro-Text-Medium] text-[18px]">
                Logout
                </h1>
                <p className='w-[80%] mx-auto tracking-tight my-0 text-secondaryTxtColor font-[SF-Pro-Text-Regular] text-center mt-4 '>
                Are you sure you want to logout from your account?
                </p>
              </div>
              <div
                onClick={() =>
                  setSwitch({ ...Switch, notificationOption: false })
                }
                className="cursor-pointer"
              >
                <img src={Exit} alt="" />
              </div>
            </div>
            <div className="">
              
              
              <div className="px-6 py-4">
                <button className="py-2 rounded-md  gap-2 flex justify-center font-[SF-Pro-Text-Medium] items-center text-btntxtclr bg-btnclr w-full ">
                Not now
                </button>
                <button className="mt-4 py-2 rounded-md   border-[1px] border-btnclr gap-2 font-[SF-Pro-Text-Medium] flex justify-center items-center text-btntxtclr w-full bg-btnclr">
                Yes, I am sure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logouts