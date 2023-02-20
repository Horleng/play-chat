import axios from 'axios';
import React, { useState,useContext } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Context} from "../Context/Context"
import { url } from '../base_url';
const Register = () => {
    const navigate = useNavigate();
    const [sendCode,setSendCode] = useState(false);
    const [create,setCreate] = useState(false);
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [password,setPassword] = useState("");
    const [confirmation,setConfirmation] = useState("");
    const {loading,setLoading} = useContext(Context);
    const handleVerifyEmail = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/verifyEmail`,{email})
        .then(res=>{
            if(res){
                setSendCode(true);
                alert(res.data.message);
                setLoading(false);
            }
        }).catch(err=>{
            if(err.response) alert(err.response.data.message);
            setLoading(false);
        })
    }
    const handleVerifyOtp = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/verified`,{email,otp})
        .then(res=>{
            if(res) {
                setCreate(true);
                alert(res.data.message);
            }
            setLoading(false);
        }).catch(err=>{
            setOtp("");
            setLoading(false);
            if(err.response) alert(err.response.data.message);
        })
    }
    const handlePressKey = (event) => {
        if(event.key ==="Enter") handleVerifyEmail();
    }
    const CreateConversation = async(userId)=>{
        await axios.get(`${url}/message/createConverWithAdmin?userId=${userId}`)
        .then(res=>{
            console.log(res.data.data.message);
        }).catch(er=>{
            if(er.response) alert(er.response.data.message);
        })
    }
    const handleCreate = async()=>{
        await axios.post(`${url}/auth/createAccount`,{email,password,confirmation})
        .then(res=>{
            if(res) {
                CreateConversation(res.data.data._id);
                alert(res.data.message);
                navigate("information/"+res.data.data._id);
            }
        }).catch(err=>{
            if(err.response) alert(err.response.data.message);
        })
    }
    useEffect(()=>{
        if(!create){
            if(sendCode) document.getElementById('otp').removeAttribute("disabled");
        }
    })
    return (
        <>
            <div className='bg-gray-300 dark:bg-slate-700 h-screen md:pt-16 pt-10 container mx-auto'>
                <h1 className='flex justify-center text-2xl font-extrabold'>Sign Up</h1>
                {
                    !create?
                    <div className='mx-auto md:mt-8 mt-5 lg:w-[50%] md:w-[70%] w-[90%] flex justify-center'>
                        <div className=' lg:w-[50%] md:w-[70%] w-[100%]  flex flex-col gap-5' >
                            <span className='flex flex-col'>
                                <label htmlFor="email">Email</label>
                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                                id='email' placeholder='example@gmail.com' onKeyPress={handlePressKey}
                                className='border border-orange-500 outline-green-500 '/>
                            </span>
                            <span className='flex flex-col'>
                                <label htmlFor="otp">Verify Email</label>
                                <input type="number" id='otp' onKeyPress={(event)=>{if(event.key==="Enter")handleVerifyOtp()}}
                                value={otp} onChange={(e)=>setOtp(e.target.value)} 
                                placeholder='xxxx' disabled
                                className='border border-orange-500 outline-green-500 '/>
                            </span>
                            {
                                sendCode?<span className='flex gap-5'>
                                    <button  onClick={handleVerifyEmail} className='w-full bg-green-600 hover:bg-green-500'>{loading?<h1 className='loading'></h1>:"send again"}</button>
                                    <button onClick={handleVerifyOtp} className='w-full bg-green-600 hover:bg-green-500'>{loading?<h1 className='loading'></h1>:"Continue"}</button>
                                    </span>:
                                    <button onClick={handleVerifyEmail} className='bg-green-600 hover:bg-green-500'>{loading?<h1 className='loading'></h1>:"Verify"}</button>
                            }
                            <p className='text-sm'>Have account? <Link to="/auth/login" className='underline text-blue-600'>Login</Link></p>
                        </div>
                    </div>:
                    <div className='mx-auto md:mt-8 mt-5 lg:w-[50%] md:w-[70%] w-[90%] flex justify-center'>
                        <div className=' lg:w-[50%] md:w-[70%] w-[100%]  flex flex-col gap-5' >
                            <span className='flex flex-col'>
                                <label htmlFor="Password">Password</label>
                                <input type="password" onKeyPress={((event)=>{if(event.key==="Enter") handleCreate()})} 
                                value={password} onChange={(e)=>setPassword(e.target.value)} 
                                id='Password' placeholder='create password...' 
                                className='border border-orange-500 outline-green-500 '/>
                            </span>
                            <span className='flex flex-col'>
                                <label htmlFor="con-pass">Confirm Password</label>
                                <input type="password" onKeyPress={((event)=>{if(event.key==="Enter") handleCreate()})}  
                                value={confirmation} onChange={(e)=>setConfirmation(e.target.value)} 
                                id='con-pass' placeholder='your password password...' 
                                className='border border-orange-500 outline-green-500 '/>
                            </span>
                            <span className='flex gap-5'>
                                <button className='bg-red-600 w-full hover:bg-red-500' onClick={()=>setCreate(false)}>Back</button>
                                <button onClick={handleCreate} className='bg-green-600 w-full hover:bg-green-500'>{loading?<h1 className='loading'></h1>:"Create"}</button>
                            </span>
                            <p className='text-sm'>Have account? <Link to="/auth/login" className='underline text-blue-600'>Login</Link></p>
                        </div>
                </div>
                }
            </div>
        </>
    );
}

export default Register;
