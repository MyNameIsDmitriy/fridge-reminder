const express = require("express");

const groceryRouter = require("./src/routers/grocery-router.js");
const userRouter = require("./src/routers/user-router.js");
const ownedGroceryRouter = require("./src/routers/owned-grocery-router.js");
const authRouter = require("./src/routers/auth-router.js");

const GroceryService = require("./src/services/grocery-service.js");
const UserService = require("./src/services/user-service.js");
const OwnedGroceryService = require("./src/services/owned-grocery-service.js");

const app = express();
const port = 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send("Something broke!");
});

//init srvices
const groceryService = new GroceryService();
const userService = new UserService();
const ownedGroceryService = new OwnedGroceryService();

//register routers
app.use("/groceries", groceryRouter(groceryService));
app.use("/users", userRouter(userService));
app.use("/fridge", ownedGroceryRouter(ownedGroceryService));
app.use("/auth", authRouter(userService));

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
