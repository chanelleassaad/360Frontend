import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../interfaces/ILogin";
import { useAuth } from "../store/authentication/AuthContext";
import { loginUser } from "../api/AdminApi";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = useAuth(); // Ensure this hook is defined correctly
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);
    const userData: ILogin = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await loginUser(userData); // Ensure loginUser is imported and defined
      console.log(res);

      // const { accessToken, refreshToken } = res;
      // await signIn(userData.username, accessToken, refreshToken);
      await signIn(userData.username);
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Error occurred"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 rounded-lg shadow">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-gray-600 hover:text-gray-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Sign in
              </button>
            </div>

            {errorMessage && (
              <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
