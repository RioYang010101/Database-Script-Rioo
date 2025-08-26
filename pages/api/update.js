import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { number, status } = req.body;
  const filePath = path.join(process.cwd(), "data", "database.json");
  const jsonData = fs.readFileSync(filePath);
  let data = JSON.parse(jsonData);

  const userIndex = data.findIndex(i => i.number === number);
  if (userIndex === -1) return res.status(404).json({ error: "Nomor tidak ditemukan" });

  data[userIndex].status = status;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(200).json({ success: true, data });
}