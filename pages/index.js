import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("active");

  // Ambil data awal
  useEffect(() => {
    fetch("/api/raw")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const addUser = async () => {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, status })
    });
    const result = await res.json();
    if (result.success) setUsers(result.data);
    setNumber("");
  };

  const updateUser = async (num, newStatus) => {
    const res = await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: num, status: newStatus })
    });
    const result = await res.json();
    if (result.success) setUsers(result.data);
  };

  const deleteUser = async (num) => {
    const res = await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: num })
    });
    const result = await res.json();
    if (result.success) setUsers(result.data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", background: "#111", color: "#fff", minHeight: "100vh" }}>
      <h1>📊 Database Bot WhatsApp</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nomor (628xxxx)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginRight: "10px" }}>
          <option value="active">Active</option>
          <option value="blacklist">Blacklist</option>
        </select>
        <button onClick={addUser}>Tambah</button>
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.number}</td>
              <td style={{ color: u.status === "active" ? "lightgreen" : "tomato" }}>{u.status}</td>
              <td>
                <button onClick={() => updateUser(u.number, u.status === "active" ? "blacklist" : "active")}>
                  Ubah Status
                </button>
                <button onClick={() => deleteUser(u.number)} style={{ marginLeft: "10px" }}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}