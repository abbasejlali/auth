import React, { useState } from "react";
import { useRouter } from "next/router";
import callApi from "./../../libs/helpers/callApi";
import { storeLoginToken } from "./../../libs/helpers/auth";

const SignIn = ({ data }) => {
  const router = useRouter();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const changeHandeler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const loginHandeler = async () => {
    //login user 
    const res=await callApi().post('/auth/login',value);
    if(res.status===200){
      const token=res.data.token; // get token 
      await storeLoginToken(token);
      router.push('/');
      // login suucessfully
    }
  };

  return (
    <>
        <div className="p-4">
          <h2>Sign In</h2>
          <div className="w-full mt-5 min-h-full h-full flex flex-col justify-center items-start ">
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
              onClick={loginHandeler}
              className="px-4 py-2 bg-[#04a769] text-white shodow 
              rounded-lg "
            >
              Login
            </button>
          </div>
        </div>
    </>
  );
};

export default SignIn;


