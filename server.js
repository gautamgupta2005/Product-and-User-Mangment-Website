const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const datapath = path.join(__dirname, "src/user.json");
const productpath = path.join(__dirname, "src/product.json");
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/home.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "src/login.html"));
});
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "src/signup.html"));
});
app.post("/form", (req, res) => {
    let newData = req.body;
    fs.readFile(datapath, "utf-8", (err, data) => {
        let products = [];
        if (!err && data) {
            products = JSON.parse(data);
        }
        const check = products.find(p => p.email === newData.email);
        if (check) {
            res.send(`
<html>
<head>
<style>
  body { font-family: Arial; background: #f4f4f4; padding: 40px; color: #333; }
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 400px; margin: 30px auto; box-shadow: 0 0 12px #ccc;}
  a { color: #007BFF; text-decoration: none; }
  h3 { color: #e74c3c; }
</style>
</head>
<body>
  <div class="container">
    <h3>Already signed up! Please <a href="/login">Login</a></h3>
  </div>
</body>
    </html>
   `)

        } else {
            products.push(newData);
            fs.writeFile(datapath, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(`
<html>
<head>
<style>
  body { font-family: Arial; background: #e3ffe8; padding: 40px; }
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 400px; margin: 30px auto; box-shadow: 0 0 14px #a9f9c5;}
  a { color: #27ae60; }
  h3 { color: #27ae60; }
</style>
</head>
<body>
  <div class="container">
    <a href="/">🏠 Home</a>
    <h3>Sign up successful! Please <a href="/login">Login</a></h3>
  </div>
</body>
</html>
`)

                }
            })
        }
    });
})
app.post("/form2", (req, res) => {
    let newData = req.body;
    fs.readFile(datapath, "utf-8", (err, data) => {
        let products = [];
        if (!err && data) {
            products = JSON.parse(data);
        }
        const check = products.find(p => p.email === newData.email);
        if (!check) {
            res.send(`
<html>
<head>
<style>
  body { font-family: Arial; background: #fceeee; padding: 40px; color: #aa2727;}
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 400px; margin: 30px auto; box-shadow: 0 0 14px #efb1b1;}
  a { color: #c0392b; }
</style>
</head>
<body>
  <div class="container">
    <h3>Please sign up first! <a href="/signup">Sign Up</a></h3>
  </div>
</body>
</html>
`)

        } else {
            if (check.pass === newData.pass) {
                res.redirect("/table");
            } else {
                res.send(`
<html>
<head>
<style>
  body { font-family: Arial; background: #fdf1ec; padding: 40px; color: #e67e22;}
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 400px; margin: 30px auto; box-shadow: 0 0 14px #ffd2b5;}
  a { color: #e67e22;}
</style>
</head>
<body>
  <div class="container">
    <h3>Wrong password! <a href="/login">Login</a> with correct password</h3>
  </div>
</body>
</html>
`);

            }
        }
    });
});
app.get("/table", (req, res) => {
    res.sendFile(path.join(__dirname, "src/table.html"));
});
app.post("/form3", (req, res) => {
    const newData = req.body;
    fs.readFile(productpath, "utf-8", (err, data) => {
        let products = [];
        if (!err && data) {
            products = JSON.parse(data);
        }
        let check = products.find(p => p.name === newData.name);
        if (check) {
            res.json({ message: "saved", newData, check })
        } else {
            res.json({ message: "Product not found" });
        }
    })
})
app.get("/details", (req, res) => {
    const name = req.query.name;
    const image = req.query.image;
    fs.readFile(productpath, "utf-8", (err, data) => {
        let products = [];
        if (!err && data) {
            products = JSON.parse(data);
        }
        let check = products.find(p => name === p.name);

        // console.log(check);
        if (check) {
            res.send(`
<html>
<head>
<style>
  body { font-family: Arial; background: #f5faff; padding: 40px; color: #34495e; }
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 500px; margin: 30px auto; box-shadow: 0 0 14px #bfe4fa;}
  h1 { color: #007BFF; margin-bottom: 10px;}
  img { border-radius: 12px; margin-top: 18px; box-shadow: 0 2px 8px #ccc;}
</style>
</head>
<body>
  <div class="container">
    <h1>${check.name}</h1>
    <h3>Price: <span style="color:#16a085;">₹${check.price}</span></h3>
    <h3>Brand: ${check.brand}</h3>
    <h3>Storage: ${check.storage}</h3>
    <h3>RAM: ${check.ram}</h3>
    <h3>Battery: ${check.battery}</h3>
    <img src="${image}" width="180px" alt="${check.name}">
  </div>
</body>
</html>
`);

        } else {
            res.json("Data Not Found")
        }
    })
})
app.listen(3000, () => {
    console.log("Server runing on http://localhost:3000/");
});

