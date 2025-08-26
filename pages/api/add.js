import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { number, status } = req.body;
  const filePath = path.join(process.cwd(), "data", "database.json");
  const jsonData = fs.readFileSync(filePath);
  let data = JSON.parse(jsonData);

  if (data.find(i => i.number === number)) {
    return res.status(400).json({ error: "Nomor sudah terdaftar" });
  }

  data.push({ number, status });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(200).json({ success: true, data });
}