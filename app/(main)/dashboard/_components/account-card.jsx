import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;
  return (
    <Card className="transition-transform transform hover:scale-105 hover:shadow-2xl rounded-xl border border-gray-300 bg-gradient-to-r from-blue-50 to-white shadow-sm">
      <Link
        href={`/account/${id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
      >
        <CardHeader className="flex justify-between items-center p-4">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {name}
            </CardTitle>
            <span className="text-xs font-medium text-white bg-blue-500 px-2 py-1 rounded-full capitalize shadow-sm">
              {type}
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Switch
                checked={isDefault}
                className="focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">
                {isDefault ? "Default Account" : "Set as Default"}
              </p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent className="mt-4 px-4">
          <div className="text-3xl font-extrabold text-gray-900">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-sm text-gray-500 capitalize mt-2">
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between mt-6 px-4 pb-4">
          <div className="flex items-center text-green-600 hover:text-green-700 transition-colors">
            <ArrowUpRight className="mr-1 h-5 w-5 animate-bounce" />
            <span className="text-sm font-medium">Income</span>
          </div>
          <div className="flex items-center text-red-600 hover:text-red-700 transition-colors">
            <ArrowDownLeft className="mr-1 h-5 w-5 animate-bounce" />
            <span className="text-sm font-medium">Expenses</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
