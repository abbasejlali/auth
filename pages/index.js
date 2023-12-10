import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  return (
    <div
      className="w-full mx-auto p-4 flex 
      justify-between items-center "
    >
      <h2>Home Page</h2>
      {data.email ? (
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-[#eee] shodow 
        rounded-lg"
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href="/signin"
          className="px-4 py-2 bg-[#eee] shodow 
        rounded-lg"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { userToken } = context.req.cookies;

  // verify Token
  if (userToken) {
    const data = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => res.json())
      .then((dataUser) => dataUser);

    if (data.email)
      return {
        props: { data },
      };

    if (!data.email) {
      return {
        props: { data: {} },
      };
    }
  }

  if (!userToken) {
    return {
      props: { data: {} },
    };
  }
}
