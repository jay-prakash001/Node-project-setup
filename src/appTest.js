import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json()); // Temporarily increased limit
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// Test route
app.post('/test123', (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  res.send("Data logged successfully");
});

// Static middleware (placed after routes)
app.use(express.static("public"));

export default app;
