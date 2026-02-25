"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export interface Invoice {
  id: string;
  amount: number; // USDC
  merchantWallet: string;
  status: "pending" | "paid";
  createdAt: Date;
}

interface PaymentGeneratorProps {
  onCreateInvoice: (invoice: Invoice) => void;
}

interface InvoiceFormData {
  amount: string;
  merchantWallet: string;
}

export function PaymentGenerator({ onCreateInvoice }: PaymentGeneratorProps) {
  const router = useRouter();

  const [formData, setFormData] = React.useState<InvoiceFormData>({
    amount: "",
    merchantWallet: "",
  });
  const [error, setError] = React.useState<string>("");
  const [isCreating, setIsCreating] = React.useState(false);

  const handleInputChange =
    (field: keyof InvoiceFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleCreateInvoice = async () => {
    const amountNum = parseFloat(formData.amount);

    if (!formData.amount || Number.isNaN(amountNum) || amountNum <= 0) {
      setError("Enter a valid amount in USDC.");
      return;
    }

    if (!formData.merchantWallet.trim()) {
      setError("Enter a merchant wallet address.");
      return;
    }

    setError("");
    setIsCreating(true);

    const id = crypto.randomUUID();

    const invoice: Invoice = {
      id,
      amount: amountNum,
      merchantWallet: formData.merchantWallet.trim(),
      status: "pending",
      createdAt: new Date(),
    };

    onCreateInvoice(invoice);

    const search = new URLSearchParams({
      amount: invoice.amount.toString(),
      wallet: invoice.merchantWallet,
    });

    router.push(`/pay/${invoice.id}?${search.toString()}`);
    setIsCreating(false);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/6 bg-[#151A21] p-8",
        "shadow-lg backdrop-blur-sm",
      )}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Create Invoice
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Generate a USDC invoice with a shareable payment link for your
            clients.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Amount (USDC)
            </label>
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="120.00"
              value={formData.amount}
              onChange={handleInputChange("amount")}
              className={cn(
                "w-full px-4 py-3 rounded-lg",
                "bg-white/5 border border-white/10",
                "text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/50 focus:border-[#1F8A70]/50",
                "transition-all duration-200",
              )}
            />
          </div>

          <div>
            <label
              htmlFor="merchantWallet"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Merchant wallet
            </label>
            <input
              id="merchantWallet"
              type="text"
              placeholder="Your USDC-compatible wallet address"
              value={formData.merchantWallet}
              onChange={handleInputChange("merchantWallet")}
              className={cn(
                "w-full px-4 py-3 rounded-lg",
                "bg-white/5 border border-white/10",
                "text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/50 focus:border-[#1F8A70]/50",
                "transition-all duration-200",
              )}
            />
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleCreateInvoice}
            disabled={isCreating}
            className={cn(
              "w-full inline-flex items-center justify-center rounded-xl px-5 py-3",
              "bg-[#1F8A70] text-white font-medium text-sm",
              "shadow-md hover:shadow-lg",
              "transition-all duration-300 ease-out",
              "hover:-translate-y-0.5 hover:bg-[#1a735c]",
              "focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/50 focus:ring-offset-2 focus:ring-offset-[#151A21]",
              "active:scale-95",
              "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
            )}
          >
            {isCreating ? "Creating..." : "Create Invoice"}
          </button>

          {error && (
            <p className="text-sm text-red-400" role="status">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentGenerator;
