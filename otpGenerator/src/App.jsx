import { useState } from 'react'
import './App.css'
import PhoneInput from 'react-phone-input-2'
import OTPInput from 'otp-input-react'
import 'react-phone-input-2/lib/style.css'
import { auth } from './firebase.config'
import {signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import toast, {Toaster} from 'react-hot-toast'
function App() {
  const [phone,setphone]=useState("")
  const [otp,setotp]=useState('')
  const [otpfield,setotpfield]=useState(false)
  const [user,setuser]=useState(null)
  const oncaptchaVerify=()=>{
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup()
        },
        'expired-callback': () => {
        }
      });
    }
  }
  const onSignup=()=>{
    oncaptchaVerify()
    const appVerifier=window.recaptchaVerifier
    const format='+'+phone
    signInWithPhoneNumber(auth, format, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setotpfield(true)
      toast.success('Otp Sended Successfully')
    }).catch((error) => {
      console.log(error)
    });
  }
  
  const handleSendOtpbtn=()=>{
    onSignup()
    setotpfield(true)
  }
  const handleVerifyOtpbtn=()=>{
      window.confirmationResult.confirm(otp).then(async(res)=>{
        console.log(res)
        setuser(res.user)
      }).catch(err=>{
        console.log(err)
      })
  }
  return (
    <>
    <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
      <div><Toaster toastOptions={{duration:4000}}/></div>
      <div id='recaptcha-container'></div>
      {user?(<h2 className='text-3xl font-medium text-white text-center'>Login Success</h2>):(<div className='grid grid-rows-2 gap-5 p-6 place-items-center'>
        <h1 className='text-3xl font-medium text-white text-center'>Verify OTP</h1>
        {otpfield?
        <div className='grid grid-rows-2 gap-4 place-items-center'>
          <OTPInput value={otp} onChange={setotp} OTPLength={6}/>
          <button className='text-white bg-orange-400 p-1 rounded' onClick={handleVerifyOtpbtn}>Verify Otp</button>
        </div>:
        <div className='grid grid-rows-2 gap-4 place-items-center'>
          <PhoneInput value={phone} country={'in'} onChange={setphone} />
          <button className='text-white bg-orange-400 p-1 rounded' onClick={handleSendOtpbtn}>Send Otp</button>
        </div>
        }
      </div>)
      }
    </div>
    </>
  )
}

export default App
