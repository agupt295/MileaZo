import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Account from './pages/account'
import CreateService from './pages/services/createService'
import PendingService from './pages/services/pendingService'
import InProgressService from './pages/services/inProgressService'
import FinishedService from './pages/services/finishedService'
import Notfound from './pages/notfound'
import Subscription from './pages/subscription'
import { Navigate } from "react-router-dom"; // Step 1: Import Redirect
import Availability from './pages/availability'
import ForgotPassword from './pages/forgotPassword'
import Subscription_payment from './pages/subscription_payment'

function App() {
  // const navigate = useNavigate()

  const CreateServiceProtected = () => {
    if(localStorage.getItem("email")){
      return <CreateService/>
    } else {
      return <Navigate to="/login" />;
    }
  }

  const AccountProtected = () => {
    if(localStorage.getItem("email")){
      return <Account/>
    } else {
      return <Navigate to="/login" />;
    }
  }

  const PendingServiceProtected = () => {
    if(localStorage.getItem("email")){
      return <PendingService/>
    } else {
      return <Navigate to="/login" />;
    }
  }

  const InProgressServiceProtected = () => {
    if(localStorage.getItem("email")){
      return <InProgressService/>
    } else {
      return <Navigate to="/login" />;
    }
  }

  const FinishedServiceProtected = () => {
    if(localStorage.getItem("email")){
      return <FinishedService/>
    } else {
      return <Navigate to="/login" />;
    }
  }

  const SubscriptionProtected = () => {
    if(localStorage.getItem("email")){
      return <Subscription/>
    } else {
      return <Navigate to="/login" />;
    }
  }

  const AvailabilityProtected = () => {
    if(localStorage.getItem("email")){
      return <Availability/>
    } else {
      return <Navigate to="/login" />;
    }
  }

  const Subscription_paymentProtected = () => {
    if(localStorage.getItem("email")){
      return <Subscription_payment/>
    } else {
      return <Navigate to="/login" />;
    }
  }


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index="/" element={<Login/>}/>
          <Route path="sign-up" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="create_service" element={<CreateServiceProtected/>}/>
          <Route path="account" element = {<AccountProtected/>}/>
          <Route path="pending_services" element={<PendingServiceProtected/>}/>
          <Route path="in_progress_services" element={<InProgressServiceProtected/>}/>
          <Route path="finished_services" element={<FinishedServiceProtected/>}/>
          <Route path="subscription" element={<SubscriptionProtected/>}/>
          <Route path="availability" element={<AvailabilityProtected/>}/>
          <Route path="forgot_pasword" element = {<ForgotPassword/>}/>
          <Route path="subscription_payment" element = {<Subscription_paymentProtected/>}/>
          <Route path="*" element={<Notfound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
