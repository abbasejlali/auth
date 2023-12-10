const UserDashboard = ({ data }) => {
  return (
    <div>
      {/* <h2>Wellcome to dashboard - {data ? data.name : null}</h2> */}
    </div>
  );
};

export default UserDashboard;

export async function getServerSideProps(context) {
  const { userToken } = context.req.cookies;

  // verify Token
  if (userToken) {
    const data = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => res.json())
      .then((userData) => userData);

    if (data.email)
      return {
        props: { data },
      };

    if (!data.email) {
      return {
        redirect: { destination: "/signin" },
      };
    }
  }

  if (!userToken) {
    return {
      redirect: { destination: "/signin" },
    };
  }
}
