import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Context} from "../Context/Context"
import { url } from '../base_url';
const ReccoverPassword = () => {
    const [sendOTP,setSendOTP] = useState(false);
    const [toVerify,setToVerify] = useState(false);
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [password,setPassword] = useState("");
    const [confirmation,setConfirmation] = useState("");
    const {loading,setLoading} = useContext(Context);
    const naviage = useNavigate();
    const VerifyEmail = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/forGetPasswordOtp`,{email})
        .then(res =>{
            alert(res.data.message);
            setSendOTP(true);
            setLoading(false);
        }).catch(err =>{
            if(err.response) alert(err.response.data.message);
            setLoading(false);
        })
    }
    const Verify = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/verified`,{otp,email})
       .then(res =>{
            setToVerify(true);
            alert(res.data.message);
            setLoading(false);
       }).catch(err=>{
        if(err.response) alert(err.response.data.message);
        setLoading(false);
       })
    }
    const handleNewPasword = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/forGetPassword`,{password,confirmation,email})
        .then(res=>{
            alert(res.data.message);
            naviage("/auth/login");
            setLoading(false);
        }).catch(err=>{
            if(err.response) alert(err.response.data.message);
            setLoading(false);
        })
    }
    return (
        <>
            <div className='bg-gray-300 dark:bg-slate-700 h-screen md:pt-16 pt-10 container'>
                <h1 className='flex justify-center text-2xl font-extrabold'>Recover Account</h1>
                {
                    !toVerify?
                    <div className='mx-auto md:mt-8 mt-5 lg:w-[50%] md:w-[70%] w-[90%] flex justify-center'>
                        <div className=' lg:w-[50%] md:w-[70%] w-[100%]  flex flex-col gap-5 '>
                            <span className='flex flex-col'>
                                <label htmlFor="email">Email</label>
                                <input type="email" id='email'  onKeyPress={(event)=>{if(event.key==="Enter") VerifyEmail()}} 
                                value={email} onChange={(e)=>setEmail(e.target.value)} 
                                placeholder='example@gmail.com' 
                                className='border border-orange-500 outline-violet-500 '/>
                            </span>
                            {
                                !sendOTP?"":
                                <span className='flex flex-col'>
                                    <label htmlFor="otp">OTP</label>
                                    <input type="number" id='otp'  onKeyPress={(event)=>{if(event.key==="Enter") Verify()}} 
                                    value={otp} onChange={(e)=>setOtp(e.target.value)} 
                                    placeholder='XXXX' 
                                    className='border border-orange-500 outline-violet-500 '/>
                                </span>
                            }
                            {
                                sendOTP?
                                <span className='flex gap-5'>
                                    <button className='w-full bg-blue-700 hover:bg-blue-600' onClick={VerifyEmail}>{loading?<h1 className='loading'></h1>:"send code again"}</button>
                                    <button className='w-full bg-blue-700 hover:bg-blue-600' onClick={Verify}>{loading?<h1 className='loading'></h1>:"to verify"}</button>
                                </span>:
                                <button className='bg-blue-700 hover:bg-blue-600' onClick={VerifyEmail}>{loading?<h1 className='loading'></h1>:"Send Code"}</button>
                            }
                            <span className='flex items-center gap-1 '>
                                <p className='text-sm'>Not account?</p><Link to="/auth/signup" className='text-sm underline text-blue-600'>Create one</Link>
                            </span>
                        </div>
                    </div>:
                    <div className='mx-auto md:mt-8 mt-5 lg:w-[50%] md:w-[70%] w-[90%] flex justify-center'>
                        <div className=' lg:w-[50%] md:w-[70%] w-[100%]  flex flex-col gap-5 '>
                            <span className='flex flex-col'>
                                <label htmlFor="new-pass">New Password</label>
                                <input type="password" id='new-pass' onKeyPress={(event)=>{if(event.key==="Enter") handleNewPasword()}}   
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                                placeholder='............' 
                                className='border border-orange-500 outline-violet-500 '/>
                            </span>
                            <span className='flex flex-col'>
                                <label htmlFor="con-pass">Confirm Password</label>
                                <input type="password" id='con-pass' onKeyPress={(event)=>{if(event.key==="Enter") handleNewPasword()}}
                                value={confirmation} onChange={e=>setConfirmation(e.target.value)}
                                placeholder='............' 
                                className='border border-orange-500 outline-violet-500 '/>
                            </span>
                            <button className='bg-blue-700 hover:bg-blue-600' onClick={handleNewPasword}>{loading?<h1 className='loading'></h1>:"Change Password"}</button>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default ReccoverPassword;
