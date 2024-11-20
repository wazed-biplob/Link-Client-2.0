"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/login");
  return (
    <>
      <div className="border w-10 h-10"></div>
    </>
  );
}
