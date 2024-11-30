"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setEmail, setImgURL, setUserId } from "../redux/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "www.biplob@gmail.com",
    password: "123456",
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch(`https://link-server-beta.vercel.app/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === true) {
          const id = data?.data?._id;
          dispatch(setUserId(data?.data?._id));
          dispatch(setImgURL(data?.data?.imgURL));
          dispatch(setEmail(data?.data?.email));
          router.push(`${id}`);
        }
      });
  };
  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
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
                  defaultValue="www.biplob@gmail.com"
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
                  defaultValue="123456"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />

                <Link
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
                  className="w-full border mt-2 px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50"
                >
                  Sign in
                </button>
              </div>
              <p className="px-6 mt-2 text-sm text-center text-gray-600">
                Don&apos;t have an account yet?
                <Link
                  href="/register"
                  className="hover:underline text-violet-600"
                >
                  <span className="text-blue-700">&nbsp;Sign up</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
