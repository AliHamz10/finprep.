import React, { Suspense } from "react";
import DashboardPage from "./page";
import { BarLoader } from "react-spinners";

const DashboardLayout = () => {
  return (
    <div className="px-5">
      {/* Dashboard Title */}
      <h1 className="text-6xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
        Dashboard
      </h1>

      {/* Dashboard Page with Loader */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#f97316" />}
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
