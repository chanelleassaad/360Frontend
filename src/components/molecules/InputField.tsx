import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const InputField = ({
  id,
  label,
  type,
  required = false,
  isPassword = false,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 relative w-full">
        <input
          id={id}
          name={id}
          type={isPassword && showPassword ? "text" : type}
          required={required}
          autoComplete={isPassword ? "current-password" : undefined}
          className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
        />
        {isPassword && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={handlePasswordToggle}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
