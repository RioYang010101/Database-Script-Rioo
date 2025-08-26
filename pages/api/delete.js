import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { number } = req.body;
  const filePath = path.join(process.cwd(), "data", "database.json");
  const jsonData = fs.readFileSync(filePath);
  let data = JSON.parse(jsonData);

  data = data.filter(i => i.number !== number);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(200).json({ success: true, data });
}