import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Context} from "../Context/Context"
import { url } from '../base_url';
const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [checkbox,setCheckbox] = useState(true);
    const {setUser,loading,setLoading} = useContext(Context);
    const navigate = useNavigate();
    const User = async()=>{
        setLoading(true);
        await axios.post(`${url}/auth/login`,{email,password})
        .then(res=>{
            setUser(res.data.data);
            alert(res.data.message);
            if(checkbox)
                localStorage.setItem("token",res.data.token);
            setLoading(false);
            navigate('/');
        }).catch(err=>{
            if(err.response) alert(err.response.data.message);
            setLoading(false);
        });
    }
    const handlePressKey = (event) => {
        if(event.key ==="Enter") User();
    }
    return (
        <>
            <div className='bg-gray-300 dark:bg-slate-700 h-screen md:pt-16 pt-10 container flex flex-col items-center w-full mx-auto'>
                <h1 className='flex justify-center text-xl font-bold  bg-gradient-to-r from-[#49C5F6] to-[#FF2AEf] bg-clip-text text-transparent'>Login</h1>
                <div className='md:mt-8 mt-5 lg:w-[50%] md:w-[70%] w-[90%]'>
                    <div className='lg:w-[50%] md:w-[70%] w-[100%]  flex flex-col gap-5 mx-auto'>
                        <span className='flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email'  onKeyPress={handlePressKey}
                             value={email} onChange={(e)=>setEmail(e.target.value)}
                            placeholder='example@gmail.com' 
                            className='border border-orange-500 outline-violet-500 '/>
                        </span>
                        <span className='flex flex-col'>
                            <label htmlFor="password">Password</label>
                            <input type="password" id='password' onKeyPress={handlePressKey}
                             value={password} onChange={(e)=>setPassword(e.target.value)}
                             placeholder='your password' 
                            className='border border-orange-500 outline-violet-500'/>
                        </span>
                        <span className='flex justify-between items-center'>
                            <span className='flex gap-2 items-center'>
                                <input type="checkbox" id='check' defaultChecked  onChange={(e)=>setCheckbox(e.target.checked)}/>
                                <label htmlFor="check">Remember me</label>
                            </span>
                            <Link to="/auth/recover">
                                <p className='text-blue-700 underline text-sm cursor-pointer'>forgot password?</p>
                            </Link>
                        </span>
                        <button  className='bg-blue-700 hover:bg-blue-600' onClick={()=>User()}>{loading?<h1 className='loading'></h1>:"Login"}</button>
                        <span className='flex items-center gap-1 '>
                            <p className='text-sm'>Not account?</p><Link to="/auth/signup" className='text-sm underline text-blue-600'>Create one</Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
