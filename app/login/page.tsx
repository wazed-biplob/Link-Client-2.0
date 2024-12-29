"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEmail, setImgURL, setUserId } from "../redux/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginMutation } from "../redux/authApi";
import { IUserLogin } from "../interface/type";
import { API_URL } from "../utils/vars";

const LoginPage = () => {
  const [dbStatus, setDbStatus] = useState<string>("Checking...");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<IUserLogin>({
    email: "wazed@gmail.com",
    password: "AsusX550LNi5#2.4",
  });

  const [fetchFormData, { isLoading, data }] = useLoginMutation();

  // database connection check
  useEffect(() => {
    const fetchDbStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/db/db-status`);
        const data = await res.json();
        setDbStatus(data?.message);
        if (data?.status === "success") {
          clearInterval(interval);
        }
      } catch (err) {
        setDbStatus("Error : " + err);
        clearInterval(interval);
      }
    };

    const interval = setInterval(fetchDbStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  // check whether user + post data has been retrieved
  useEffect(() => {
    if (data) {
      setLoginSuccess(true);
    }
  }, [data]);

  // login handler
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetchFormData(formData).unwrap();
    if (res?.success === true) {
      const id = res?.data?._id;
      dispatch(setUserId(res?.data?._id));
      dispatch(setImgURL(res?.data?.imgURL));
      dispatch(setEmail(res?.data?.email));
      router.push(`${id}`);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center border-lime-500 border-8 h-[100vh]">
        <div className="flex flex-col items-center max-w-md p-4 rounded-md sm:p-8 border bg-gray-50 text-gray-800">
          <div className="flex items-center">
            <Image src="/favicon.png" width={40} height={40} alt="Link Logo" />
            <h1 className="font-bold text-[36px]">
              <span className="text-pink-600">ink</span>
            </h1>
          </div>
          <div className="text-center">
            <p className="text-sm my-4 text-gray-600">
              Sign in to access your account
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  defaultValue="wazed@gmail.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="Password"
                  defaultValue="AsusX550LNi5#2.4"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />

                <Link
                  onClick={() => alert("not implemented")}
                  href="#"
                  className="text-xs mt-1 mb-3 text-right hover:underline text-gray-600"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading || loginSuccess}
                  className={`${
                    isLoading || loginSuccess
                      ? "bg-slate-500 cursor-not-allowed"
                      : "bg-violet-600 hover:bg-violet-700"
                  } w-full border mt-2 px-8 py-3 font-semibold rounded-md text-gray-50 `}
                >
                  {!(isLoading || loginSuccess) && <span>Sign In</span>}
                  {isLoading && !loginSuccess && (
                    <span className="text-[16px]">&nbsp;...Loading</span>
                  )}
                  {!isLoading && loginSuccess && (
                    <span className="text-[16px]">&nbsp;...Redirecting</span>
                  )}
                </button>
              </div>
              <p className="px-6 mt-2 text-sm text-center">
                <Link
                  onClick={() => alert("not implemented")}
                  href="#"
                  className="hover:underline text-violet-600"
                >
                  Don&apos;t have an account yet?
                </Link>
              </p>
            </div>
          </form>
          {
            <span className="text-[12px] mt-2 border rounded-sm px-2">
              {dbStatus}
            </span>
          }
        </div>
      </div>
    </>
  );
};

export default LoginPage;
