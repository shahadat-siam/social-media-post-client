import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      if (data.remember_me) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
      navigate(from);
      toast.success("Login successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md md:mt-8 mt-4 mx-auto bg-gray-100 shadow-md rounded px-8 py-6 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Log in</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="email" className="block text-md font-semibold text-start text-gray-700">
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">Email is required</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-md font-semibold text-start text-gray-700">
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">Password is required</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("remember_me")}
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-indigo-600 text-white py-2 px-7 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
