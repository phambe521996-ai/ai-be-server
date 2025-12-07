const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// ===== TOKEN BẠN CUNG CẤP =====
const MASTER_TOKEN = "521996Vn@";

// ===== TRẠNG THÁI AI (BẬT / TẮT) =====
let AI_ON = true;

app.use(express.json());

// ===== KIỂM TRA TOKEN =====
function checkToken(req, res, next) {
  const token = req.headers["x-token"];
  if (!token || token !== MASTER_TOKEN) {
    return res.status(403).json({ error: "Sai token" });
  }
  next();
}

// ===== TRANG CHỦ =====
app.get("/", (req, res) => {
  res.send("✅ AI BE SERVER ĐANG HOẠT ĐỘNG");
});

// ===== BẬT AI =====
app.post("/ai/on", checkToken, (req, res) => {
  AI_ON = true;
  res.json({ status: "✅ AI ĐÃ BẬT" });
});

// ===== TẮT AI =====
app.post("/ai/off", checkToken, (req, res) => {
  AI_ON = false;
  res.json({ status: "⛔ AI ĐÃ TẮT" });
});

// ===== KIỂM TRA TRẠNG THÁI =====
app.get("/ai/status", (req, res) => {
  res.json({ AI_ON });
});

// ===== API CHÍNH =====
app.post("/ai", checkToken, (req, res) => {
  if (!AI_ON) {
    return res.json({ error: "⛔ AI ĐANG TẮT" });
  }

  const { message } = req.body;

  res.json({
    reply: `🤖 AI ĐÃ NHẬN: ${message}`
  });
});

app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});
