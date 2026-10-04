"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardPageHeader from "@/components/Dashboard/common/DashboardPageHeader";
import {
  FaSpinner,
  FaMoneyBillWave,
  FaUser,
  FaCalendarAlt,
  FaHashtag,
  FaCheck,
  FaCopy,
} from "react-icons/fa";
import { TbTransactionDollar } from "react-icons/tb";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";


const fetchTransactions = async (token) => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transaction`,
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
 const {
        data: session,
        isPending,
 } = authClient.useSession()

  const userId = session?.user?.id; // Debugging line to check the user ID
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
        // user data
        const user = await authClient.user();
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

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (id) => {
    if (!id || id === "-") return;
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      toast.success("Transaction ID copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.danger("Failed to copy Transaction ID");
    }
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-6 pb-12 text-left"
    >
      {/* Header matching Overview */}
      <DashboardPageHeader
        icon={TbTransactionDollar}
        title="Transactions History"
        subtitle={`${transactions.length} ${transactions.length === 1 ? "transaction" : "transactions"} recorded across all payment channels`}
        badges={[
          <span key="badge" className="text-active font-semibold">
            Financial Ledger & Audit
          </span>,
        ]}
      />

      {transactions.length === 0 ? (
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-12 text-center shadow-xs border border-brand-500/15">
          <p className="text-[#535C91] dark:text-[#9290C3] font-['Inter']">
            No transactions found.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl border border-brand-500/15 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-brand-500/15 text-[#535C91] dark:text-[#9290C3] uppercase tracking-wider font-['Outfit'] text-[11px] font-bold">
                <tr>
                  <th className="py-4 px-6">
                    <span className="flex items-center gap-1.5">
                      <FaUser className="w-3.5 h-3.5 text-active" />
                      User Email
                    </span>
                  </th>
                  <th className="py-4 px-6">
                    <span className="flex items-center gap-1.5">
                      <FaMoneyBillWave className="w-3.5 h-3.5 text-active" />
                      Amount
                    </span>
                  </th>
                  <th className="py-4 px-6">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="w-3.5 h-3.5 text-active" />
                      Date
                    </span>
                  </th>
                  <th className="py-4 px-6">
                    <span className="flex items-center gap-1.5">
                      <FaHashtag className="w-3.5 h-3.5 text-active" />
                      Transaction ID
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-500/10">
                {transactions.map((txn) => {
                  const rawId = txn.transactionId || txn.sessionId || "-";
                  const isCopied = copiedId === rawId;

                  return (
                    <tr
                      key={txn._id}
                      className="hover:bg-black/2 dark:hover:bg-white/2 transition-colors"
                    >
                      <td className="py-4 px-6 font-semibold text-foreground">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 border border-brand-500/10 flex items-center justify-center text-active shrink-0">
                            <FaUser className="w-3.5 h-3.5" />
                          </div>
                          <span>{txn.userEmail}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-['Outfit'] font-black text-emerald-600 dark:text-emerald-400 text-sm">
                        ${Number(txn.price || txn.amount || 0).toFixed(2)}
                      </td>

                      <td className="py-4 px-6 text-[#535C91] dark:text-[#9290C3] font-medium text-xs">
                        {formatDate(txn.bookedAt || txn.createdAt || txn.date)}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(rawId)}
                            title="Click to copy full Transaction ID"
                            className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all cursor-pointer ${
                              isCopied
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                                : "bg-black/5 dark:bg-white/5 hover:bg-active/10 hover:border-active/30 border-brand-500/15 text-foreground"
                            }`}
                          >
                            <span className="font-semibold tracking-tight">
                              {truncateId(rawId)}
                            </span>
                            {isCopied ? (
                              <span className="flex items-center gap-1 text-[11px] font-['Outfit'] font-bold text-emerald-600 dark:text-emerald-400">
                                <FaCheck className="w-3 h-3 shrink-0" />
                                <span>Copied</span>
                              </span>
                            ) : (
                              <FaCopy className="w-3 h-3 text-[#535C91] dark:text-[#9290C3] group-hover:text-active transition-colors shrink-0" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionsHistoryPage;
