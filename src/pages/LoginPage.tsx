import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../interfaces/ILogin";
import { useAuth } from "../store/authentication/AuthContext";
import { loginUser } from "../api/AdminApi";
import InputField from "../components/molecules/InputField";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Start loading state

    const formData = new FormData(event.currentTarget);
    const userData: ILogin = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    try {
      await loginUser(userData);
      await signIn(userData.username);
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Error occurred"
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] w-full min-h-full flex-1 flex-col  lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 rounded-lg shadow">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Username Field */}
          <InputField id="username" label="Username" type="text" required />

          {/* Password Field */}
          <InputField
            id="password"
            label="Password"
            type="password"
            isPassword
            required
          />

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
}
