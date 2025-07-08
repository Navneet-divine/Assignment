import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center h-screen  w-full">
        <div>
          <h1 className="text-4xl text-gray-600">Welcome to Dume.AI</h1>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Register
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
