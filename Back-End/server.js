require("./Config/config");
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// Import route
const userRoutes = require("./Routes/user.routes");

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Path absolut ke folder views
const viewsPath = path.join(__dirname, "..","Front-End", "views");
app.use(express.static(viewsPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(viewsPath, "index.html"));
});

app.use(
  "/views/Images",
  express.static(path.join(viewsPath, "Images"))
);

// Gunakan rute pengguna
app.use("/api/users", userRoutes); // Prefix '/api/users' untuk semua rute dalam userRoutes
