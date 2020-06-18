const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4"); 

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // const { title, url, techs } = request.query;
  // const results = title
  //   ? repositories.filter(repository => repository.title.include(title))
  //   : repositories;
  //   response.json(results);
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 }
  repositories.push(repository);
  response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not Found'});
  }
  const updateRepository = { id, title, url, techs, likes: repositories[repositoryIndex].likes };
  repositories[repositoryIndex] = updateRepository;
  response.json(updateRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found " });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found'});
  }
  const newLike = repositories[repositoryIndex].likes + 1;
  repositories[repositoryIndex].likes = newLike;
  return response.status(200).json(repositories[repositoryIndex]);
});


module.exports = app;
