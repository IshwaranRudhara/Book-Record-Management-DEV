const { request } = require("express");
const express = require("express");
const { users } = require("./data/users.json");
const app = express();

const PORT = 8081;

app.use(express.json()); // tranfser to json format

// const data = ["ish", "dev"];
app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and its running",
  });
});
/**
 *  route: /users
 * method : GET
 * description : Get all the users
 *access: public
 * paramaters: none
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /users/:id
 * /users/2
 * Method : GET
 * Description : Get single user by there id
 * Access: Public
 * Paramaters: id
 */
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Route: /users
 *
 * Method : POST
 * Description : Create a new user
 * Access: Public
 * Paramaters: NONE
 **/
app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404)({
      success: false,
      message: "user already exits",
    });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "this route does not exit",
  });
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
