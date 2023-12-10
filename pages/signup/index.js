import React, { useState } from "react";
import { useRouter } from "next/router";
import callApi from "../../libs/helpers/callApi";
import { storeLoginToken } from "./../../libs/helpers/auth";

const SignIn = ({ data }) => {
  const router = useRouter();

  const [value, setValue] = useState({
    mame:"",
    email: "",
    password: "",
  });

  const changeHandeler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const RegisterHandeler = async () => {
    //register user 
    try{
      const res=await callApi().post('/auth/register',value);
      console.log(res);
    if(res.status===201){
      router.push('/signin');
      // register successfully
    }

    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
        <div className="p-4">
          <h2>Sign Up</h2>
          <div className="w-full mt-5 min-h-full h-full flex flex-col justify-center items-start ">
          <input
              type="text"
              name="name"
              placeholder="name"
              value={value.name}
              onChange={changeHandeler}
              className="px-4 py-3 border mb-3 w-[300px] border-solid border-[#eee]"
            />

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={value.email}
              onChange={changeHandeler}
              className="px-4 py-3 border mb-3 w-[300px] border-solid border-[#eee]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={value.password}
              onChange={changeHandeler}
              className="px-4 py-3 border mb-3 w-[300px] border-solid border-[#eee]"
            />
            <button
              onClick={RegisterHandeler}
              className="px-4 py-2 bg-[#04a769] text-white shodow 
              rounded-lg "
            >
              Register
            </button>
          </div>
        </div>
    </>
  );
};

export default SignIn;


