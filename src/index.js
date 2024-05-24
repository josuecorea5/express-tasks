const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const tasks = [];

app.get("/tasks", (req, res) => {
  res.json({ data: tasks });
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id));
  if (!task) {
    res.status(404);
    return res.json({ error: "Task not found" });
  }

  res.json({ data: task });
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json({ data: newTask });
});

app.put("/tasks/:id", (req, res) => {
  const indexTask = tasks.findIndex(
    (task) => task.id === Number(req.params.id)
  );

  if (indexTask === -1) {
    res.status(404);
    return res.json({ error: "Task not found" });
  }

  tasks[indexTask] = {
    ...tasks[indexTask],
    ...req.body,
  };

  res.json({ data: tasks[indexTask] });
});

app.delete("/tasks/:id", (req, res) => {
  const task = tasks.find((task) => task.id === Number(req.params.id));

  if (!task) {
    res.status(404);
    return res.json({ error: "Task not found" });
  }

  tasks.splice(tasks.indexOf(task), 1);

  res.json({ data: task });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
