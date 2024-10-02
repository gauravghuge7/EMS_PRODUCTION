import { useRef, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const verifyOtpRef = useRef(null);
  const changePasswordRef = useRef(null);

  const [verifyOtpDialog, setVerifyOtpDialog] = useState(false);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);

  const openVerifyOtp = () => {
    if (verifyOtpRef.current) {
      verifyOtpRef.current.showModal();
    }
    setVerifyOtpDialog(true);
  };

  const closeVerifyOtp = () => {
    if (verifyOtpRef.current) {
      verifyOtpRef.current.close();
    }
    setVerifyOtpDialog(false);
  };

  const openChangePassword = () => {
    if (changePasswordRef.current) {
      changePasswordRef.current.showModal();
    }
    setChangePasswordDialog(true);
  };

  const closeChangePassword = () => {
    if (changePasswordRef.current) {
      changePasswordRef.current.close();
    }
    setChangePasswordDialog(false);
  };

  const sentOtp = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const body = {
        email: email,
      };

      const response = await axios.post(`/user/forgotPassword`, body, config);

      if (response.data.success) {
        toast.success("OTP Sent Successfully");
        openVerifyOtp();
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error?.message ;
      alert(errorMessage);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const body = {
        email: email,
        otp: otp,
      };

      if (otp === "") {
        alert("Please enter OTP");
        return;
      }

      const response = await axios.post(`/user/verifyOtp`, body, config);

      if (response.data.success) {
        closeVerifyOtp();
        openChangePassword();
      } else {
        alert("Invalid OTP");
      }
    } 
    catch (error) {
      console.log(" error => ", error);
      const errorMessage = error?.response?.data?.error?.message ;
      alert(errorMessage);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const body = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      if (password === "" || confirmPassword === "") {
        alert("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await axios.post(`/user/changePassword`, body, config);

      if (response.data.success) {
        closeChangePassword();
        window.location.href = "/";
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="absolute top-0 right-0 p-4">
        <Toaster position="top-right" richColors closeButton expand={true} />
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl border border-gray-300">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

        <form onSubmit={sentOtp}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send OTP
          </button>
        </form>
      </div>

      {/* OTP Verification Dialog */}
      {verifyOtpDialog && (
        <dialog
          ref={verifyOtpRef}
          className="absolute z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Verify OTP
            </h2>
            <form onSubmit={verifyOtp}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Enter OTP
                </label>
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 6-digit OTP"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Verify OTP
              </button>
            </form>
            <button
              onClick={closeVerifyOtp}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </dialog>
      )}

      {/* Change Password Dialog */}
      {changePasswordDialog && (
        <dialog
          ref={changePasswordRef}
          className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Change Password
            </h2>
            <form onSubmit={changePassword}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Change Password
              </button>
            </form>
            <button
              onClick={closeChangePassword}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default ForgotPass;
