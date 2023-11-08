import React,{useMemo,lazy,Suspense} from 'react';
import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import  Forget from  './screens/Forget';
import MultiSteps  from './screens/MultiSteps';
import  Login from './screens/Login';
import Footer from './components/Footer';

function App() {
  const steps = useMemo(()=>[
    "Account Deatils",
    "Company Details",
    "Choose Your Plan",
    "Business Branding",
    "App logo",
    "FLAIR Pay",
    "Contract review",
    "Payment Method",
  ],[]);
  return (
    <div className="h-full w-full bg-background relative">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/otp" element={ <Forget/> } />
        <Route path="/form" element={ <MultiSteps steps={steps}/> } />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
