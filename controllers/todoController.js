const Todo = require("../models").Todo;

const createTodo = async (req, res, next) => {
    try {
      const { title } = req.body;
  
      if (!title) {
        return res.status(400).json({
          error: "Title is required",
          message: "Please enter a title for the todo",
        });
      }
  
      const todo = await Todo.create({ title });
      res.status(200).json({
        todo,
        createdTodo: `Todo ${title} has been created`,
        message: "Todo created successfully",
        page: req.query.page,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        error,
        message: "Something went wrong",
      });
      next(error);
    }
  };
  

const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json({
      todos,
      message: "Todos fetched successfully",
      total: todos.length,
      page: req.query.page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({
        error: "Todo not found",
        message: "Todo not found please create",
      });
    }
    await todo.update({ title });
    res.status(200).json({
      todo,
      message:`${title} updated successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error,
      message: "Something went wrong",
    });
    next(error); 
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({
        error: "Todo not found",
        message: "Todo not found please create",
      });
    }
    await todo.destroy();
    res.status(200).send({
        message: `Todo ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
      message: "Something went wrong",
    });
    next(error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
