const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post("/todo", todoController.createTodo);

router.get("/todos", todoController.getTodos);

router.put("/todos/:id", todoController.updateTodo);

router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
