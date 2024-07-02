import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../Hook/useAuth";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async (data) => {
    try {
      await resetPassword(data.email);
      setEmailSent(true);
      toast.success("Password reset email sent successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mt-8 mx-auto bg-gray-100 shadow-md rounded px-8 py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      {!emailSent ? (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-indigo-600 text-white py-2 px-7 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600">
              Send Reset Link
            </button>
          </div>
        </form>
      ) : (
        <p className="text-center text-green-500">A password reset link has been sent to your email address.</p>
      )}
    </div>
  );
};

export default ForgotPassword;
