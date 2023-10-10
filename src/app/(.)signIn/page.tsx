import Login from "../../components/auth/Login";

const signInPageIntercepted = () => {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="relative w-1/2 flex flex-col gap-4">
        <Login />
      </div>
    </div>
  );
};

export default signInPageIntercepted;
