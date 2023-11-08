import React, { useState, useEffect } from "react";
import Data from "../Json/Country.json";
import State from "../Json/State.json";
import City from "../Json/City.json";
interface IPops {
  country:{
    country_id:string;
    sortname:string;
    country_name:string;
  }[]
  country1:{
    country_id:string;
    sortname:string;
    country_name:string;
  }
  city:{
    city_id: string;
    city_name: string;
    state_id: string;
  }[]
  city1:{
    city_id: string;
    city_name: string;
    state_id: string;
  }
  state:{
    state_id: string;
    state_name: string;
    country_id: string;
  }[]
  state1:{
    state_id: string;
    state_name: string;
    country_id: string;
  }
}
const  Country=()=> {
  const [country, setCountry] = useState<IPops['country']>(Data);
  const [countryid, setCountryid] = useState<string>("");
  const [stateid, setStateid] = useState<string>("");
  const [stetes, setSat] = useState<IPops['state']>([]);
  const [cities, setCities] = useState<IPops['city']>([]);

  const handlecountry = (event: any) => {
    const getcoutryid = event.target.value;
    setCountryid(getcoutryid);
    event.preventDefault();
  };
  const handlestate = (event: any) => {
    const getstateid = event.target.value;
    setStateid(getstateid);
    event.preventDefault();
  };

  useEffect(() => {
    const getstate = async () => {
      let filterData:IPops['state'] = State.filter((items:IPops['state1']) => {
        return items.country_id == countryid;
      });
      setSat(filterData);
    };
    getstate();
  }, [countryid]);

  useEffect(() => {
    const getCity = () => {
      let filterData:IPops['city'] = City.filter((items: IPops['city1']) => {
        return items.state_id == stateid;
      });
      setCities(filterData);
    };
    getCity();
  }, [stateid]);
  return (
    <div className="">
          <div className="flex flex-col md:w-[47%] lg:w-[26%] xl:w-[30%] w-[100%] ">
              <label
                htmlFor=""
                className="text-mainTextColor tracking-tight  hover:shadow-none font-bold mb-2 font-[SF-Pro-Text-Medium]"
              >
                Country
              </label>
              <div className="bg-lightgray py-3 pr-2 rounded-md">
                <select
                  name=""
              onChange={(e) => handlecountry(e)}

                  className="outline-none  tracking-tight  w-full rounded-md text-secondaryTxtColor  px-2 bg-cardColor"
                  id=""
                >
                <option value="">Select Country</option>
                {country.map((getcon: IPops['country1']) => (
                <option key={getcon.country_id} value={getcon.country_id}>
                  {" "}
                  {getcon.country_name}
                </option>
              ))}
                </select>
              </div>
            </div>
          <div className="md:w-[47%] lg:w-[49%] xl:w-[49%] w-[100%]  flex flex-col">
              <label
                htmlFor=""
                className="text-mainTextColor tracking-tight  hover:shadow-none font-bold mb-2 font-[SF-Pro-Text-Medium]"
              >
                Province/State
              </label>
              <div className="bg-lightgray  rounded-md pr-2 py-3">
                <select
                  name=""
              onChange={(e) => handlestate(e)}

                  className="w-full tracking-tight  outline-none rounded-md text-secondaryTxtColor  px-2 bg-cardColor"
                  id=""
                >
                  <option value="">Choose Your province/state</option>
                  {stetes.map((st: IPops['state1'], index: number) => (
                <option key={index} value={st.state_id}>
                  {st.state_name}
                </option>
              ))}
                </select>
              </div>
            </div>
          <div className="flex md:w-[47%] lg:w-[47%] xl:w-[48%]  w-[100%] flex-col">
              <label
                htmlFor=""
                className="text-mainTextColor hover:shadow-none tracking-tight  font-bold mb-2  font-[SF-Pro-Text-Medium]"
              >
                City
              </label>
              <div className="py-3 bg-lightgray rounded-md pr-2">
                <select
                  name=""
                  className="w-full outline-none rounded-md tracking-tight  text-secondaryTxtColor  px-2 bg-cardColor"
                  id=""
                >
                  <option value="">Choose Your city</option>
                  {cities.map((st: IPops['city1'], index: number) => (
                <option key={index} value={st.city_id}>
                  {st.city_name}
                </option>
              ))}
                </select>
              </div>
            </div>

    </div>
  );
}
export default Country;
