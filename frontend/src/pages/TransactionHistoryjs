import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions/");
        setTransactions(res.data);
      } catch (err) {
        setError("Failed to fetch transactions. Are you logged in?");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>📜 Transaction History</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {transactions.length === 0 && <p style={{ textAlign: "center" }}>No transaction history found.</p>}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th>Book</th>
            <th>Borrowed On</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{tx.book.title}</td>
              <td>{new Date(tx.borrow_date).toLocaleDateString()}</td>
              <td>{new Date(tx.due_date).toLocaleDateString()}</td>
              <td style={{ color: tx.is_overdue ? "red" : "green" }}>
                {tx.is_returned ? "Returned" : tx.is_overdue ? "Overdue" : "Borrowed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
