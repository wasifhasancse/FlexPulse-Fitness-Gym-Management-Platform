"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSpinner,
  FaMoneyBillWave,
  FaUser,
  FaCalendarAlt,
  FaHashtag,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";

export const metadata = {
  title: "Admin - Transactions",
  description:
    "View and manage all transactions on the platform. This section allows administrators to maintain the quality and integrity of the financial records within FlexPulse.",
};

const fetchTransactions = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to load transactions: ${res.status} ${errText}`);
  }
  return res.json();
};

const TransactionsHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set page title
  useEffect(() => {
    document.title = "Transactions | FlexPulse";
  }, []);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const { data: token } = await authClient.token();
        if (!token?.token) {
          throw new Error("Unable to retrieve auth token");
        }
        const data = await fetchTransactions(token.token);
        setTransactions(data || []);
      } catch (err) {
        setError(err.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateId = (id) => {
    if (!id) return "-";
    if (id.length <= 20) return id;
    return `${id.slice(0, 10)}...${id.slice(-6)}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 text-active animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-rose-500 font-sans">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 px-4 sm:px-0"
    >
      <div>
        <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
          Transactions History
        </h1>
        <p className="font-sans text-[#535C91] dark:text-[#9290C3] mt-1">
          {transactions.length}{" "}
          {transactions.length === 1 ? "transaction" : "transactions"} recorded on the platform
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-12 text-center shadow-card border border-brand-500/15 dark:border-brand-500/20">
          <p className="text-[#535C91] dark:text-[#9290C3] font-sans">
            No transactions found.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-brand-500/10 text-[#535C91] dark:text-[#9290C3]">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaUser className="w-3.5 h-3.5 text-active" />
                      User Email
                    </span>
                  </th>
                  <th className="py-3.5 px-6 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaMoneyBillWave className="w-3.5 h-3.5 text-active" />
                      Amount
                    </span>
                  </th>
                  <th className="py-3.5 px-6 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="w-3.5 h-3.5 text-active" />
                      Date
                    </span>
                  </th>
                  <th className="py-3.5 px-6 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaHashtag className="w-3.5 h-3.5 text-active" />
                      Transaction ID
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr
                    key={txn._id}
                    className="border-b border-brand-500/10 hover:bg-brand-500/5 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-foreground">
                      {txn.userEmail}
                    </td>
                    <td className="py-4 px-6 text-active font-extrabold">
                      ${Number(txn.price || txn.amount || 0).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-foreground font-medium text-xs">
                      {formatDate(txn.bookedAt || txn.createdAt || txn.date)}
                    </td>
                    <td className="py-4 px-6">
                      <code className="bg-brand-500/10 px-2.5 py-1 rounded-lg text-xs font-mono text-foreground border border-brand-500/20">
                        {truncateId(txn.transactionId || txn.sessionId || "-")}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionsHistoryPage;
