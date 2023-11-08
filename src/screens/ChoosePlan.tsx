import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

interface IProps {
  handleNext: any;
}
const ChoosePlan: React.FC<IProps> = ({ handleNext }) => {
  const navigate = useNavigate();

  const features: any = [
    [
      "Mobile Pay",
      "Flexible Payment Options",
      "Complete Operation Management",
      "Reporting & Analytics",
      "Manual Marketing Campaigns",
      "Promotion Management",
      "SmartFill",
      "Waitlists",
      "Automated Payroll & Rent",
      "Loyalty & Referral Program",
      "Client Insights",
      "Preset & custom client groups",
      "Client & Group Blasts",
      "No Show & Cancellation Polic",
    ],
    [
      "Artificial Intelligence powered automated campaigns",
      "Automated Workflows",
      "Mobile Pay",
      "Flexible Payment Options",
      "Complete Operation Management",
      "Reporting & Analytics",
      "Manual Marketing Campaigns",
      "Promotion Management",
      "SmartFill",
      "Waitlists",
      "Automated Payroll & Rent",
      "Loyalty & Referral Program",
      "Client Insights",
      "Preset & custom client groups",
      "Client & Group Blasts",
      "No Show & Cancellation Polic",
    ],
    [
      "Artificial Intelligence powered automated campaigns",
      "Automated Workflows",
      "Mobile Pay",
      "Flexible Payment Options",
      "Complete Operation Management",
      "Reporting & Analytics",
      "Manual Marketing Campaigns",
      "Promotion Management",
      "SmartFill",
      "Waitlists",
      "Automated Payroll & Rent",
      "Loyalty & Referral Program",
      "Client Insights",
      "Preset & custom client groups",
      "Client & Group Blasts",
      "No Show & Cancellation Polic",
    ]
  ];
  const subTitles: any = [
    "Complete set of services and advanced features for small & mid-size businesses to accelerate their growth.",
    "Augmenting the Growth package with a set of AI powered algorithms and automations focused on increasing profitability.",
    "Augmenting the Premium package with a set of AI powered algorithms and automations focused on profitability."
  ];
  const services: any = [
    ["FLAIR Web", "FLAIR Manager", "FLAIR POS"],
    ["FLAIR Web", "FLAIR Manager", "FLAIR POS"],
    ["FLAIR Mobile", "FLAIR Web", "FLAIR Manager", "FLAIR POS"]
  ];
  const [plans, setPlans] = React.useState([]);
  React.useEffect(() => {
    let token = localStorage.getItem('token')
    axios.get(process.env.REACT_APP_API_URL + "/shop/plans", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    })
      .then((result: any) => {
        setPlans(result.data.data);
      })
      .catch(err => {
        if (err.response.data && err.response.data.status === 401) {
          navigate('/');
        } else {
          console.log(err.response.data)
        }
      })
  }, []);
  return (
    <div>
      <div className="w-[100%] ">
        <div className="text-center mt-8 mb-6">
          <h3 className="text-mainTextColor leading-[40px] tracking-[-0.012em] font-[SF-Pro-Display-Semibold] xl:text-[32px] text-[28px] md:text-[32px] lg:text-[32px]  font-[590]  ">
            Choose your plan
          </h3>
        </div>
        <div className="w-full mx-auto my-0 mb-8 flex gap-6 justify-center mt-4 flex-wrap">
          {
            plans.map((plan: any, index: number) => (
              <div key={plan.id} className="md:w-[35%] sm:w-[45%] lg:w-[30%] xl:w-[22%] w-[85%] ">
                <Card
                  title={plan.name}
                  plan_id = {plan.id}
                  subtitle={subTitles[index]}
                  price={plan.price}
                  handleNext={handleNext}
                  duration={plan.duration_name}
                  service={services[index]}
                  plus={index === 1 ? "Most Popular" : ''}
                  features={features[index]}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;
