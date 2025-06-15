// import React from "react";

// import "./LoginPage.css"; 
// export default function LoginPage() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
     
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('/src/pics/main_banner_bg.png')" }}
//       ></div>
//       <div className="absolute inset-0 bg-black opacity-50"></div>

      
//       <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Welcome Back</h2>
//         <p className="text-center text-gray-500 mb-6">Login to continue shopping</p>

        
//         <form className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//             />
//           </div>

         
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//             />
//             <a href="#" className="text-xs text-green-600 hover:underline mt-1 block text-right">
//               Forgot Password?
//             </a>
//           </div>

        
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
//           >
//             Log In
//           </button>
//         </form>

       
//         <div className="my-6 flex items-center">
//           <hr className="flex-grow border-t border-gray-300" />
//           <span className="mx-4 text-gray-500">or</span>
//           <hr className="flex-grow border-t border-gray-300" />
//         </div>

        

       
//          <p className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <a href="/register" className="text-green-600 hover:underline font-medium">
//             Create Account
//           </a>
//         </p> 

        

        
//       </div>
//     </div>
//   );
// }




// import React from "react";

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('/src/pics/main_banner_bg.png')" }}
//         aria-hidden="true"
//       ></div>

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-lg min-h-[400px] rounded-2xl bg-white shadow-lg p-10 space-y-8">
//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-center text-green-700">Welcome Back</h2>

//         {/* Subtitle */}
//         <p className="text-center text-gray-500">Login to continue shopping</p>

//         {/* Form */}
//         <form className="space-y-6">
//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
//               required
//             />
//             <a href="#" className="text-xs text-green-600 hover:text-green-800 mt-1 block text-right underline-offset-2 hover:underline">
//               Forgot Password?
//             </a>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
//           >
//             Log In
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-t border-gray-300" />
//           <span className="mx-4 text-gray-500 text-sm">or</span>
//           <hr className="flex-grow border-t border-gray-300" />
//         </div>

//         {/* Sign Up Link */}
//         <p className="text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <a
//             href="/register"
//             className="font-medium text-green-600 hover:text-green-800 hover:underline underline-offset-2"
//           >
//             Create Account
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
    console.log("Login submitted:", data);
    console.log(storedUser);
    if(
      data.username === storedUser.username &&
      data.password === storedUser.password
    ){
      alert("Login sucessful");
      navigate("/Homepage");
    }else {
      alert("Invalid credentials");
    }
    // Add authentication logic here
    navigate("/"); // Redirect after login
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/src/pics/main_banner_bg.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Login form container */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">Login to continue shopping</p>

        {/* Login form - now using react-hook-form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
            <Link 
              to="/forgot-password" 
              className="text-xs text-green-600 hover:underline mt-1 block text-right"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Divider and registration link remain the same */}
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link 
            to="/RegisterPage" 
            className="text-green-600 hover:underline font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
