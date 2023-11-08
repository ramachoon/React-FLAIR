import * as React from "react";
import axios from "axios";
import AddForm, { Service } from "../components/AddForm";
import UploadLogo from "../components/UploadLogo";
import Country from "../Json/Country.json";
import State from "../Json/State.json";
import City from "../Json/City.json";
import { useDispatch } from 'react-redux'
import { formData } from '../redux/reducers/formDataReducers'
import InputWithLabel from '../components/InputWithLabel'
import DropdownCountry from "../components/DropdownCountry";
import { useNavigate } from "react-router-dom";
import ImgUploadCrop from "../components/ImgUploadCrop";
import { ReactComponent as Backarrow } from "../assets/svgs/leftarrooooo.svg";
import Svg from "../components/Svg";
import Button from "../components/Button";

interface IForm {
    formValues: {
        id: number;
        firs_tname: string;
        last_name: string;
        email: string;
        phone: string;
    }[];
}

interface IPops {
    handleNext: any
    handleBack: any
}
const CompanyDetails: React.FC<IPops> = ({ handleNext, handleBack }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const country: any = Country;
    const [countryid, setCountryid] = React.useState<string>("");
    const [stateid, setStateid] = React.useState<string>("");
    const [stetes, setSat] = React.useState<string[]>([]);
    const [cities, setCities] = React.useState<string[]>([]);
    // const [staff, setStaff] = React.useState('')
    const [error, setError] = React.useState(false)
    const [getFormData, setFormData] = React.useState<Service['service']>([]);
    const [companyDetails, setCompanyDetails] = React.useState<any>(
        {
            businessname: '',
            city: '',
            location: '',
            staffsize: '',
            website: '',
            googlereviews: '',
            facebookpage: '',
            instgrampg: '',
            country: '',
            state: '',
        }
    );
    const handlecountry = (value: any) => {
        setCountryid(value.split(',')[0]);
        setCompanyDetails({
            ...companyDetails, country: value.split(',')[1]
        })
    };
    const handlestate = (value: any) => {
        setStateid(value.split(',')[0]);
        setCompanyDetails({
            ...companyDetails, state: value.split(',')[1]
        })
    };
    const handlecity = (value: any) => {
        setCompanyDetails({
            ...companyDetails, city: value.split(',')[1]
        })
    };

    React.useEffect(() => {
        const getstate = async () => {
            let filterData: any = State.filter((items) => {
                return items.country_id == countryid;
            });
            setSat(filterData);
        };
        getstate();
    }, [countryid]);

    React.useEffect(() => {
        const getCity = () => {
            let filterData: any = City.filter((items: any) => {
                return items.state_id == stateid;
            });
            setCities(filterData);
        };
        getCity();
    }, [stateid]);

    let [getImg, setGetImg] = React.useState(undefined)
    const HandlerChanger = (e: any) => {
        const { value, name } = e.target;
        setCompanyDetails({
            ...companyDetails, [name]: value
        })
        localStorage.setItem('companyDetails', JSON.stringify(companyDetails))
    }
    React.useEffect(() => {
        try {
            let data = localStorage.getItem('companyDetails')
            let token = localStorage.getItem('token')
            if (!token) {
                navigate('/')
            }
            if (data) {
                let newData: any = JSON.parse(data)
                setCompanyDetails(newData)
                // setStaff(newData.staffsize)
            }
        } catch (error) {
            navigate('/')
        }
    }, [])
    const handlerSubmit = () => {
        if (handlerValidation()) {

            let accountdeatails: any = localStorage.getItem('accountdetails')
            let asdf: any = JSON.parse(accountdeatails)
            let user: any = localStorage.getItem('user')
            let asdfUser: any = JSON.parse(user)
            let token = localStorage.getItem('token')
            let newData = {
                ...asdfUser,
                ...asdf,
                businessLogo: getImg,
                ...companyDetails,
                businessContact: getFormData
            }
            axios.post(
                process.env.REACT_APP_API_URL + "/shop/company",
                {
                    business_name: companyDetails.businessname,
                    logo_image_name: getImg,
                    country: companyDetails.country,
                    state: companyDetails.state,
                    city: companyDetails.city,
                    address: companyDetails.location,
                    staff_size: companyDetails.staffsize,
                    website: companyDetails.website,
                    google_review: companyDetails.googlereviews,
                    facebook_page: companyDetails.facebookpage,
                    instagram_page: companyDetails.instgrampg,
                    contact_details: getFormData,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `bearer ${token}`,
                    },
                })
                .then((result: any) => {
                    dispatch(formData(newData))
                    handleNext()
                })
                .catch(error => {
                    if (error.response.data && error.response.data.status === 401) {
                        navigate('/');
                    } else {
                        setError(true)
                        console.log(error.response.data)
                    }
                });
        } else {
            setError(true)
        }
    }
    const handlerValidation = () => {
        if (
            companyDetails.businessname != '' &&
            companyDetails.city != '' &&
            companyDetails.location != '' &&
            companyDetails.staffsize != '' &&
            companyDetails.website != '' &&
            companyDetails.googlereviews != '' &&
            companyDetails.facebookpage != '' &&
            companyDetails.instgrampg != '' &&
            companyDetails.country != '' &&
            companyDetails.state != ''
        ) {

            let [data] = getFormData.map((items: any) => {
                if (items.first_name != '' &&
                    items.last_name != '' &&
                    items.email != '' &&
                    items.phone != '') {
                    return true
                } else {
                    return false
                }
            })
            return data
        } else {
            return false
        }
    }
    const [select, setselected] = React.useState({
        country: '',
        state: '',
        city: ''
    });

    return (
        <div>
            <div className="mt-4 xl:w-[75%] lg:w-[90%] md:w-[90%] w-[100%] md:mx-auto md:my-0 lg:mx-auto  lg:my-0 xl:mx-auto xl:my-0">
                <div className="text-center">
                    <h3 className=" text-mainTextColor font-[SF-Pro-Display-Semibold] leading-[40px] tracking-[-0.012em]  my-8 xl:text-[32px] text-[25px] md:text-[32px] lg:text-[32px]  font-[590] ">
                        Welcome Nick! Tell us a bit about <br /> your business.
                    </h3>
                </div>
                <form action="">
                    <div className=" mt-4 flex flex-wrap gap-5 xl:w-[80%] lg:w-[80%] sm:w-[80%] md:w-[80%] w-[100%] sm:mx-auto sm:my-0 md:mx-auto md:my-0 lg:mx-auto  lg:my-0 xl:mx-auto">
                        <div className=" lg:w-[29%] md:w-[47%] flex items-end w-[100%] xl:w-[26%]">
                            <ImgUploadCrop setGetLogo={setGetImg} />
                        </div>
                        <div className="flex flex-col lg:w-[34%] md:w-[47%] w-[100%] xl:w-[38%]">
                            <InputWithLabel label='Business name' placeholder="Enter the name of your company" handlerchange={HandlerChanger} value={companyDetails.businessname} name='businessname' />
                            {error && companyDetails.businessname === "" && (
                                <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                    This field is required
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:w-[47%] lg:w-[30%] xl:w-[30%] w-[100%] ">
                            <label
                                htmlFor=""
                                className={`leading-[20px]  text-darkblue tracking-[-0.01em] font-[510] font-[SF-Pro-Text-Medium] text-[14px] mb-2 ${error && !select.country && !companyDetails.country && "text-red-600"}`}
                            >
                                Country
                            </label>
                            <div className="   ">
                                <DropdownCountry error={error && !select.country && !companyDetails.country} select={select.country || companyDetails.country} name='country' placeholder="Choose your country" >
                                    {country.map((getcon: any) => (
                                        //styleName: Body/Regular 14px;
                                        <li key={getcon.country_id} className='leading-[20px]  text-darkblue tracking-[-0.01em] font-[400] font-[SF-Pro-Text-Regular] text-[14px] px-4 py-2 cursor-pointer hover:bg-lightgray ' onClick={() => (setselected({ ...select, country: getcon.country_name }), handlecountry(`${getcon.country_id},${getcon.country_name}`))}>
                                            {getcon.country_name}
                                        </li>
                                    ))}
                                </DropdownCountry>
                            </div>
                            {error && !select.country && !companyDetails.country && (
                                <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                    Please choose your country
                                </p>
                            )}
                        </div>
                        <div className="md:w-[47%] lg:w-[49%] xl:w-[49%] w-[100%]  flex flex-col">
                            <label
                                htmlFor=""
                                className={`leading-[20px]  text-darkblue tracking-[-0.01em] font-[510] font-[SF-Pro-Text-Medium] text-[14px] mb-2 ${error && !select.state && !companyDetails.state && 'text-red-600'}`}
                            >
                                Province/State
                            </label>
                            <div className="h-full  ">
                                <DropdownCountry error={error && !select.state && !companyDetails.state} select={select.state || companyDetails.state} name='state' placeholder="Choose your province/state" >
                                    {stetes.map((st: any, index: number) => (
                                        <li key={index} className='leading-[20px]  text-darkblue tracking-[-0.01em] font-[400] font-[SF-Pro-Text-Regular] text-[14px] px-4 py-2 cursor-pointer hover:bg-lightgray' onClick={() => (setselected({ ...select, state: st.state_name }), handlestate(`${st.state_id},${st.state_name}`))}>
                                            {st.state_name}
                                        </li>
                                    ))}
                                </DropdownCountry>
                            </div>
                            {error && !select.state && !companyDetails.state && (
                                <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                    Please choose your province/state
                                </p>
                            )}
                        </div>
                        <div className="flex md:w-[47%] lg:w-[47%] xl:w-[48%]  w-[100%] flex-col">
                            <label
                                htmlFor=""
                                className={`leading-[20px]  text-darkblue tracking-[-0.01em] font-[510] font-[SF-Pro-Text-Medium] text-[14px] mb-2 ${error && !select.city && !companyDetails.city && cities.length > 0 && 'text-red-600'}`}
                            >
                                City
                            </label>
                            <div className="h-full ">
                                <DropdownCountry select={select.city || companyDetails.city} name='state' placeholder="Choose your city" error={error && !select.city && !companyDetails.city && cities.length > 0}>
                                    {cities.map((st: any, index: number) => (
                                        <li key={index} className='leading-[20px]  text-darkblue tracking-[-0.01em] font-[400] font-[SF-Pro-Text-Regular] text-[14px] px-4 py-2 cursor-pointer hover:bg-lightgray tracking-[-0.01em]' onClick={() => (setselected({ ...select, city: st.city_name }), handlecity(`${st.city_id},${st.city_name}`))}>
                                            {st.city_name}
                                        </li>
                                    ))}
                                </DropdownCountry>
                            </div>
                            {error && !select.city && !companyDetails.city && (
                                <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                    Please choose your city
                                </p>
                            )}
                        </div>
                        <div className="md:w-[47%] lg:w-[48%] xl:w-[58%] w-[100%] flex flex-col">
                            <InputWithLabel error={error && companyDetails.location === ''} label='Location address' placeholder="Enter your location" handlerchange={HandlerChanger} value={companyDetails.location} name='location' />
                            {error && companyDetails.location === '' && (
                                <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                    This field is required
                                </p>
                            )}
                        </div>
                        <div className="flex  flex-col  xl:w-[37%] lg:w-[48%] w-[100%]">
                            <label
                                htmlFor=""
                                className={`leading-[20px]  text-darkblue tracking-[-0.01em] font-[510] font-[SF-Pro-Text-Medium] text-[14px] mb-2 ${error && companyDetails.staffsize === '' && "text-red-600"}`}
                            >
                                Staff size
                            </label>
                            <div className="flex gap-2 items-center">
                                <input className={`w-[120px] ${companyDetails.staffsize == 'Independent' ? 'bg-foreground text-white' : 'bg-cardColor text-mainTextColor'} w-full px-4 cursor-pointer py-3  rounded-3xl tracking-tight caret-transparent `} onClick={HandlerChanger} value='Independent' name='staffsize' readOnly />
                                <input className={`w-[40px] ${companyDetails.staffsize == '1' ? 'bg-foreground text-white' : 'bg-cardColor text-mainTextColor'}  px-4 cursor-pointer py-3 rounded-3xl tracking-tight caret-transparent `} onClick={HandlerChanger} value='1' name='staffsize' readOnly />
                                <input className={`w-[60px] ${companyDetails.staffsize == '2-5' ? 'bg-foreground text-white' : 'bg-cardColor text-mainTextColor'} px-4 cursor-pointer py-3 rounded-3xl  tracking-tight caret-transparent`} onClick={HandlerChanger} value='2-5' name='staffsize' readOnly />
                                <input className={`w-[50px] ${companyDetails.staffsize == '6+' ? 'bg-foreground text-white' : 'bg-cardColor text-mainTextColor'} px-4 cursor-pointer py-3 rounded-3xl tracking-tight caret-transparent `} onClick={HandlerChanger} value='6+' name='staffsize' readOnly />
                            </div>
                            {error && companyDetails.staffsize === '' && (
                                <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                    Please select staff size
                                </p>
                            )}
                        </div>
                        <div className="w-full mt-3">
                            <div className="">
                                <h4 className=" text-[16px] font-[700]  leading-[22px] font-[SF-Pro-Text-Bold] tracking-[-0.01em]">
                                    Online links
                                </h4>
                                <p className="text-secondaryTxtColor font-[SF-Pro-Text-Regular] font-[400] text-[12px] my-2 leading-[18px] tracking-[-0.01em] ">
                                    Add your company website and social media links for sharing
                                    with clients
                                </p>
                            </div>
                            <div className="flex mt-4 gap-6 flex-wrap">
                                <div className="flex flex-col xl:w-[48%]  md:w-[47%] lg:w-[48%] w-[100%]">
                                    <InputWithLabel error={error && companyDetails.website === ''} label='Website' placeholder="www.yoursite.com" handlerchange={HandlerChanger} value={companyDetails.website} name='website' />
                                    {error && companyDetails.website === '' && (
                                        <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                            Enter valid url
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col xl:w-[48%] lg:w-[47%] md:w-[48%] w-[100%]">
                                    <InputWithLabel error={error && companyDetails.googlereviews === ''} label='Google reviews' placeholder="www.g.page./r/yoursite/review" handlerchange={HandlerChanger} value={companyDetails.googlereviews} name='googlereviews' />
                                    {error && companyDetails.googlereviews === '' && (
                                        <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                            Enter valid url
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col xl:w-[48%] lg:w-[47%] md:w-[48%] w-[100%]">
                                    <InputWithLabel error={error && companyDetails.facebookpage === ''} label='Facebook page' placeholder="www.facebook.com/yoursite" handlerchange={HandlerChanger} value={companyDetails.facebookpage} name='facebookpage' />
                                    {error && companyDetails.facebookpage === '' && (
                                        <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                            Enter valid url
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col xl:w-[48%] md:w-[47%] lg:w-[48%] w-[100%]">
                                    <InputWithLabel error={error && companyDetails.instgrampg === ''} label='Instgram page' placeholder="www.instagram.com/yoursite" handlerchange={HandlerChanger} value={companyDetails.instgrampg} name='instgrampg' />
                                    {error && companyDetails.instgrampg === '' && (
                                        <p className="text-red-400 text-[12px] text-leftw-full font-bold mt-2 font-[SF-Pro-Text-Regular]">
                                            Enter valid url
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <form action="">
                    <div className="my-8 mt-10 text-center">
                        <h3 className="text-mainTextColor  text-[25px] leading-[40px] md:text-[32px] xl:text-[32px] lg:text-[32px] font-[590] tracking-[-0.012em]  font-[SF-Pro-Display-Semibold]">
                            Business contacts
                        </h3>
                        <p className="text-secondaryTxtColor leading-[20px] mt-4 mb-8 w-[100%] font-[SF-Pro-Text-Regular] mx-auto my-0 xl:text-[14px] sm:text-xs tracking-[-0.01em]  text-xs md:text-sm lg:text-sm">
                            Please let us know if your business has any additional
                            stakeholders access to all of your <br /> services.
                        </p>
                    </div>
                    <AddForm error={error} setFormData={setFormData} setError={setError} />
                </form>
            </div>
            <div className="mt-14 mb-16  mx-auto my-0 w-[90%]  flex md:justify-center justify-end lg:justify-center xl:justify-between relative">
                <Button  >
                    <button className="flex items-center w-[120px] h-[45px] gap-2 justify-center border-darkblue border-[2px] px-6 py-2 rounded-3xl">
                        <Svg componentName={Backarrow} color='' width="20" height="10" />
                        <span className="text-[14px] font-[400] leading-[20px] tracking-[-0.01em] text-mainTextColor font-[SF-Pro-Text-Regular]">
                            Back
                        </span>
                    </button>
                </Button>
                <Button
                    className='w-[50%] md:w-[330px] xl:w-[380px] lg:w-[420px] font-[SF-Pro-Text-Bold] bg-btnclr tracking-tight font-[700] text-[16px] text-btntxtclr px-6 rounded-3xl py-3' onClick={handlerSubmit}
                >Continue</Button>
                <Button className='opacity-0'>
                    <button className=" flex items-center w-[120px] h-[45px] gap-2 justify-center border-[#1642C5] border-[1px] px-6 py-2 rounded-3xl">
                        <span className="font-bold text-[14px] tracking-tight text-mainTextColor">
                            Back
                        </span>
                    </button>
                </Button>
            </div>
        </div>
    );
};

export default CompanyDetails;
