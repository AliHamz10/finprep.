"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";
import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/actions/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "current",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  useEffect(() => {
    if (typeof window !== "undefined" && newAccount && !createAccountLoading) {
      toast.success("Account created successfully!");
      reset();
      setOpen(false);
    }
  }, [createAccountLoading, newAccount]);

  useEffect(() => {
    if (typeof window !== "undefined" && error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  const onSumbit = async (data) => {
    const formattedData = {
      ...data,
      type: data.type.toUpperCase(), // Convert type to uppercase to match AccountType enum
    };
    await createAccountFn(formattedData);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-gray-900 text-white rounded-lg shadow-2xl max-w-lg mx-auto">
        <DrawerHeader className="px-6 py-4 border-b border-gray-700">
          <DrawerTitle className="text-2xl font-bold text-orange-500">
            Create New Account
          </DrawerTitle>
          <DrawerClose className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
            ✕
          </DrawerClose>
        </DrawerHeader>
        <div className="px-6 py-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSumbit)}>
            {/* Account Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Main Checking"
                className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 rounded-md px-4 py-2"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            {/* Account Type */}
            <div className="space-y-2">
              <label
                htmlFor="type"
                className="text-sm font-medium text-gray-300"
              >
                Account Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type") || "current"}
              >
                <SelectTrigger
                  id="type"
                  className="bg-gray-800 border border-gray-700 text-white rounded-md px-4 py-2"
                >
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-700 text-white rounded-md">
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>
            {/* Initial Balance */}
            <div className="space-y-2">
              <label
                htmlFor="balance"
                className="text-sm font-medium text-gray-300"
              >
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 rounded-md px-4 py-2 appearance-none"
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-red-500 text-sm">{errors.balance.message}</p>
              )}
            </div>
            {/* Set as Default */}
            <div className="space-y-2">
              <label
                htmlFor="isDefault"
                className="text-sm font-medium text-gray-300"
              >
                Set as Default
              </label>
              <p className="text-sm text-gray-400">
                This account will be selected by default for transactions.
              </p>
              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
                className="mt-2"
              />
            </div>
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            <div className="pt-2">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white font-medium py-2 px-4 rounded-md transition"
                >
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
