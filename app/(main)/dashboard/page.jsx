import { getUserAccounts } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "@/actions/budget";
import BudgetProgress from "./_components/budget-progress";

async function DashboardPage() {
  let accounts = [];
  let budgetData = null;

  try {
    accounts = await getUserAccounts();
  } catch (error) {
    console.error("Error fetching user accounts:", error);
  }

  const defaultAccount = accounts?.find((account) => account.isDefault);

  if (defaultAccount) {
    try {
      budgetData = await getCurrentBudget(defaultAccount.id);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  }

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

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
        {accounts?.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
