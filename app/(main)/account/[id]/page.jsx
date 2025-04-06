import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import TransactionTable from "../_components/transaction-table";
import { BarLoader } from "react-spinners";
import AccountChart from "../_components/account-chart";

const AccountsPage = async ({ params }) => {
  const accountData = await getAccountWithTransactions(params.id);
  if (!accountData) notFound();

  const { transactions, ...account } = accountData;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Account Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold">{account.name}</h1>
        <p className="text-lg mt-2 capitalize">{account.type} Account</p>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            label: "Current Balance",
            value: `$${parseFloat(account.balance).toFixed(2)}`,
            bgColor: "bg-green-100",
            textColor: "text-green-800",
            icon: "💰",
          },
          {
            label: "Transactions",
            value: account._count.transactions,
            bgColor: "bg-blue-100",
            textColor: "text-blue-800",
            icon: "📊",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${item.bgColor} ${item.textColor}`}
          >
            <div className="text-4xl">{item.icon}</div>
            <div>
              <div className="text-2xl font-semibold">{item.value}</div>
              <p className="text-sm">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#4F46E5" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>
      {/* Transaction Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Transactions</h2>
        <Suspense
          fallback={
            <BarLoader className="mt-4" width={"100%"} color="#4F46E5" />
          }
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
};

export default AccountsPage;
