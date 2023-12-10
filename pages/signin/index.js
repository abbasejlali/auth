import React, { useState } from "react";
import { useRouter } from "next/router";

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
    const InfoLogin = {
      method: "POST",
      body: JSON.stringify({ email: value.email, password: value.password }),
      headers: { "Content-Type": "application/json" },
    };

    const res = await fetch(
      "https://api.escuelajs.co/api/v1/auth/login",
      InfoLogin
    );

    const data = await res.json();

    if (data.access_token) {
      const { access_token } = data;

      // set 20 days later
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 20);

      // Set Cookie
      document.cookie = `userToken=${access_token}; expires=${currentDate}; path=/;`;

      // verify token
      fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then((res) => res.json())
        .then((dataUser) => {
          if (dataUser.email) {
            router.push("/dashboard");
          }
        });
    }

    if (data.message === "Unauthorized") {
      console.log("go to sign up");
    }
  };

  return (
    <>
      {!data.email && (
        <div className="p-4">
          <h2>Sign In</h2>
          <div className="w-full mt-5 min-h-full h-full flex flex-col justify-start items-start ">
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
      )}
    </>
  );
};

export default SignIn;

export async function getServerSideProps(context) {
  const { userToken } = context.req.cookies;

  // verify token
  if (userToken) {
    const data = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => res.json())
      .then((dataUser) => dataUser);

    if (data.email) {
      return {
        redirect: { destination: "/dashboard" },
      };
    }

    if (!data.email) {
      return {
        props: { data: {} },
      };
    }
  }

  if (!userToken)
    return {
      props: { data: {} },
    };
}
