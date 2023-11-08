import React, { useEffect, useState } from "react";
import { isValidPhoneNumber } from 'react-phone-number-input/input'
import InputWithLabel from "../components/InputWithLabel";
import Number from "./Number";

export interface Service {
  service: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }[];
  serviceList: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  error: boolean;
  setError?: any;
}

const AddForm: React.FC<any> = ({ setFormData, error, setError }) => {
  const [serviceList, setServiceList] = useState<Service["service"]>([
    {
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
  ]);
  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { name, value } = e.target;
    const list: Service["service"] | any = [...serviceList];
    list[index][name] = value;
    setServiceList(list);

  };

  const handleServiceRemove = (index: number): void => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = (): void => {
    if(setError) {
      setError(false);
    }
    setServiceList([
      ...serviceList,
      {
        id: serviceList.length,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
    ]);
  };
  useEffect(() => {
    setFormData(serviceList);

  }, [serviceList]);
  return (
    <div className="bg-contentBackground">
      {serviceList.map(
        (singleService: Service["serviceList"], index: number) => (
          <div key={index} className="services bg-contentBackground">
            <div className="first-division mt-8">
              <div className="md:w-[80%] lg:w-[80%] w-[100%] sm:w-[80%] xl:w-[80%] mx-auto my-0 justify-between flex ">
                <h1 className="float-left text-start font-[700] leading-[22px] text-[16px] tracking-[-0.01em] text-darkblue  font-[SF-Pro-Text-Bold]">
                  Contacts
                </h1>
                {serviceList.length !== 1 && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleServiceRemove(index)}
                      className="remove-btn"

                    >
                      <span className="text-red-500 leading-[20px] text-[14px] font-[510] font-[SF-Pro-Text-Medium]">X Delete contact</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="justify-between  flex flex-wrap gap-4 md:w-[80%] lg:w-[80%] w-[100%] sm:w-[80%] xl:w-[80%] mx-auto my-0">
                <div className="flex flex-col mt-3 md:w-[48%] lg:w-[48%] xl:w-[48%] w-[100%]">
                  <InputWithLabel
                    error={error && singleService.first_name === ''}
                    label="First name"
                    placeholder="Enter your first name"
                    handlerchange={handleServiceChange}
                    index={index}
                    value={singleService.first_name}
                    name="first_name"
                  />
                  {error && singleService.first_name === '' && (
                    <p className="text-red-400 text-[12px] text-left w-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col mt-3 md:w-[48%] lg:w-[48%] xl:w-[48%] w-[100%]">
                  <InputWithLabel
                    error={error && singleService.last_name === ''}
                    label="Last name"
                    placeholder="Enter your last name"
                    index={index}
                    handlerchange={handleServiceChange}
                    value={singleService.last_name}
                    name="last_name"
                  />
                  {error && singleService.last_name === '' && (
                    <p className="text-red-400 text-[12px] text-left w-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col mt-3 md:w-[48%] lg:w-[48%] xl:w-[48%] w-[100%]">
                  <InputWithLabel
                    label="Email"
                    error={error && (singleService.email === '' || singleService.email.indexOf('@') < 1 || singleService.email.indexOf('.') < 1)}
                    placeholder="Enter your email"
                    index={index}
                    handlerchange={handleServiceChange}
                    value={singleService.email}
                    name="email"
                  />
                  {error && (singleService.email === '' || singleService.email.indexOf('@') < 1 || singleService.email.indexOf('.') < 1) && (
                    <p className="text-red-400 text-[12px] text-left w-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                      Please enter valid email address
                    </p>
                  )}
                </div>
                <div className="flex mt-3 md:w-[48%] lg:w-[48%] xl:w-[48%] w-[100%]">
                  <div className="flex flex-col  w-full h-full">
                    <label htmlFor="" className={`${error && (!singleService.phone || !isValidPhoneNumber(singleService.phone) || singleService.phone === '') && "text-red-600"} leading-[20px]  text-darkblue tracking-[-0.01em] font-[510] font-[SF-Pro-Text-Medium] text-[14px] mb-2`}>
                      Phone name
                    </label>
                    <Number error={error && (!singleService.phone || !isValidPhoneNumber(singleService.phone) || singleService.phone === '')} index={index} serviceList={serviceList} setServiceList={setServiceList} />
                    {error && (!singleService.phone || !isValidPhoneNumber(singleService.phone) || singleService.phone === '') && (
                      <p className="text-red-600 font-bold mt-2 font-[SF-Pro-Text-Regular]">
                        Invalid phone number
                      </p>
                    )}
                    {/* <div className="bg-cardColor px-4 py-3  rounded-md">
                      <span>+62 | </span>
                      <input
                        className="  text-[14px]  text-mainTextColor bg-cardColor tracking-tight"
                        type={'text'}
                        name={'phone'}
                        value={singleService.phone}
                        onChange={(e)=>handleServiceChange(e, index)}
                        placeholder={' 207 207 88 33'}
                        />
                      </div> */}
                  </div>
                </div>
              </div>
              {serviceList.length - 1 === index && serviceList.length < 4 && (
                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    onClick={handleServiceAdd}
                    className="add-btn"
                  >
                    <span className="font-[510] leading-[25px] text-[18px] text-foreground  tracking-[-0.01em]  font-[SF-Pro-Text-Regular]">
                      + Add other contact
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default AddForm;
