import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import React from "react";

const AccountsPage = async ({ params }) => {
  const accountData = await getAccountWithTransactions(params.id);
  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="container mx-auto p-6">
      {/* Account Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{account.name}</h1>
        <p className="text-gray-600">
          {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
        </p>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
          <div className="text-3xl font-semibold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm">Current Balance</p>
        </div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md">
          <div className="text-3xl font-semibold">
            {account._count.transactions}
          </div>
          <p className="text-sm">Transactions</p>
        </div>
      </div>

      {/* Chart Section */}

      {/* Transaction Table */}
    </div>
  );
};

export default AccountsPage;
