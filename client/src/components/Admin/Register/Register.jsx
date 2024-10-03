import { useState } from 'react';

import axios from 'axios';
import { toast, Toaster } from 'sonner';

function Register() {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(firstName, lastName, email, phoneNumber, password);

    if (!firstName || !lastName || !email || !phoneNumber || !password ) {
      alert("All fields are required");
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Invalid Email");
      return;
    }

    if (phoneNumber.length !== 10) {
      alert("Invalid Phone Number");
      return;
    }

    if (!/^(?:[a-zA-Z0-9_]+[^\w]|\w+)(?:[^\w]\w+|[^\w])$/.test(password) || password.length <= 6) {
      alert("Password must have one capital letter, one number, one special character, and be greater than 6 letters");
      return;
    }

  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
  
    if (phoneNumber.length < 10) {
      alert("Invalid Phone Number");
      return;
    }
  
    /* create a post request to the server with the form data */
    const body = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      role: "role",
    });
  
    try {
      const response = await axios.post(
        "/api/v1/admin/registerUser",
        body,
        config
      );
  
      console.log("respppppppp", response);
      const data = response.data;
      console.log("data of employee while registering emp received from backend", data);
  
    
  
      if (data.success === true) {
        toast.success("Employee Successfully registered!");

        window.location.href = "/admin-dashboard";
      }


    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register employee. Please try again.");
    }
  };
  return (
    <div className="p-10 text-black bg-gray-100">

      <Toaster position="top-right" richColors closeButton expand={true} />

      <h1 className="mb-8 font-extrabold text-4xl">Employee Registeration </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit}>
          {/* First name input field */}
          <div>
            <label className="block font-semibold" htmlFor="FirstName">
              First Name
            </label>
            <input
              className="w-full shadow-inner bg-white text-sm rounded-lg placeholder-black  p-4 border-none block mt-1"
              id="FirstName"
              type="text"
              name="FirstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last name input field */}
          <div>
            <label className="block font-semibold" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="w-full shadow-inner bg-white text-sm rounded-lg placeholder-black p-4 border-none block mt-1"
              id="lastName"
              type="text"
              name="lastName"
              required="required"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Department input field */}

          {/* <div>
            <label className="block font-semibold" htmlFor="department">
              Department
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
              id="department"
              type="text"
              name="department"
              required="required"
              value={lastName}
            />
          </div> */}

          {/* Email input field */}
          <div className="mt-4">
            <label className="block font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full shadow-inner bg-white text-sm rounded-lg placeholder-black p-4 border-none block mt-1 "
              id="email"
              type="email"
              name="email"
              required="required"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone number input field */}
          <div className="mt-4">
            <label className="block font-semibold" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="w-full shadow-inner bg-white text-sm rounded-lg placeholder-black  p-4 border-none block mt-1 "
              id="phoneNumber"
              type="tel"
              name="email"
              required="required"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/* Password input field */}
          <div className="mt-4">
            <label className="block font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full shadow-inner bg-white text-sm rounded-lg placeholder-black p-4 border-none block mt-1"
              id="password"
              type="password"
              name="password"
              required="required"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/***** 
         
            <div>
              <label className="block font-semibold" htmlFor="role">
                Role
              </label>
              <input
                className="w-full shadow-inner bg-white text-sm rounded-lg placeholder-black p-4 border-none block mt-1"
                id="role"
                type="text"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

          */}

          {/* Submit button */}
          <div className="flex items-center justify-between mt-8">
            <button
              type="submit"
              className="flex items-center justify-center text-sm px-6 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Register
            </button>

            <a className="font-semibold">Already registered?</a>
          </div>
        </form>

        <aside className="">
          <div className="bg-gray-100 p-8 rounded">
            <h2 className="font-bold text-2xl">Instructions</h2>
            <ul className="list-disc mt-4 list-inside">
              <li>
                All users must provide a valid email address and password to
                create an account.
              </li>
              <li>
                Users must not use offensive, vulgar, or otherwise inappropriate
                language in their username or profile information
              </li>
              <li>
                Users must not create multiple accounts for the same person.
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default Register;
