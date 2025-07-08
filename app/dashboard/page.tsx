import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-600">Welcome to the Dashboard</div>
      </div>
    </>
  );
}
