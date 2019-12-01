const express = require('express');
const cors = require('cors');
const app = express();

const { ENVIRONMENT, PORT } = process.env;
const IS_DEVELOPMENT = ENVIRONMENT === 'development';

// middleware
app.use(express.json());
app.use(cors({
  origin: IS_DEVELOPMENT ? 'http://localhost:3000' : 'https://dtang-react-crud.surge.sh'
}));

const db = {
  posts: [
    
    
  ]
};

app.get('/api/posts', (request, response) => {
  response.json(db.posts);
});

app.post('/api/game', (request, response) => {
  const game = request.body;  
  db.posts.push(game);
  response.json(game);
});

app.get('/api/posts/:id', (request, response) => {
  const id = Number(request.params.id);
  const post = db.posts.find((post) => {
    return post.id === id;
  });

  if (post) {
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.delete('/api/posts/:id', (request, response) => {
  const id = Number(request.params.id);
  const post = db.posts.find((post) => {
    return post.id === id;
  });

  if (post) {
    db.posts = db.posts.filter((post) => {
      return post.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put('/api/posts/:id', (request, response) => {
  const id = Number(request.params.id);
  const post = db.posts.find((post) => {
    return post.id === id;
  });

  if (post) {
    Object.assign(post, request.body)
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.listen(PORT || 8000);