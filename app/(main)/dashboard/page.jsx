import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

function DashboardPage() {
  return (
    <div className="px-5">
      {/* Budget Progress */}

      {/* Overview */}

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateAccountDrawer>
          <Card className="group cursor-pointer transition-all transform hover:scale-105 hover:bg-black hover:border-white border border-gray-700 bg-gray-800 text-white">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Plus className="h-10 w-10 mb-2 text-orange-500 group-hover:text-white transition-all" />
              <p className="text-sm font-medium group-hover:font-bold group-hover:text-white transition-all">
                Add New Account
              </p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>
    </div>
  );
}

export default DashboardPage;
