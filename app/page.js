"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("active");

  async function fetchUsers() {
    const res = await fetch("/api/raw");
    const data = await res.json();
    setUsers(data);
  }

  async function addUser(e) {
    e.preventDefault();
    await fetch("/api/raw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, status }),
    });
    setNumber("");
    fetchUsers();
  }

  async function deleteUser(id) {
    await fetch("/api/raw", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📂 Database Bot WhatsApp</h1>

      <form onSubmit={addUser} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="628xxxx"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="border p-2 rounded text-black"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded text-black"
        >
          <option value="active">Active</option>
          <option value="blacklist">Blacklist</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>

      <table className="border w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Nomor</th>
            <th className="p-2">Status</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border text-center">
              <td className="p-2">{u.number}</td>
              <td className="p-2">{u.status}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}