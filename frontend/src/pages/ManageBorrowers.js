// pages/ManageBorrowers.js
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ManageBorrowers() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Borrowed / Returned Books</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Book</th>
            <th>Borrower</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Return Date</th>
            <th>Fine</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} style={{ textAlign: "center", borderBottom: "1px solid #ccc" }}>
              <td>{t.book.title}</td>
              <td>{t.member.user.username}</td>
              <td>{t.borrow_date}</td>
              <td>{t.due_date}</td>
              <td>{t.return_date || "-"}</td>
              <td>${t.fine}</td>
              <td>{t.return_date ? "Returned" : "Borrowed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
