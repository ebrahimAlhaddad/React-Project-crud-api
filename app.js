const express = require('express');
const cors = require('cors');
const app = express();

const { ENVIRONMENT, PORT } = process.env;
const IS_DEVELOPMENT = ENVIRONMENT === 'development';

// middleware
app.use(express.json());
app.use(cors({
  origin: IS_DEVELOPMENT ? 'http://localhost:3000' : 'http://localhost:3000'
}));


const db = {
  games: [
    
    
  ]
};

app.get('/api/games', (request, response) => {
  response.json(db.games);
});

app.post('/api/games', (request, response) => {
  const game_request = request.body;  
  const game_db = db.games.find((game) => {
    return game.id === game_request.id;
  });
  if(game_db){
    response.status(504).send();
  } else {
    db.games.push(game);
    response.status(204).send();
  }

});

app.get('/api/games/:id', (request, response) => {
  const id = Number(request.params.id);
  const game = db.games.find((game) => {
    return game.id === id;
  });

  if (game) {
    response.json(game);
  } else {
    response.status(404).send();
  }
});

app.delete('/api/games/:id', (request, response) => {
  const id = Number(request.params.id);
  const game = db.games.find((game) => {
    return game.id === id;
  });

  if (game) {
    db.games = db.games.filter((game) => {
      return game.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put('/api/games/:id', (request, response) => {
  const id = Number(request.params.id);
  const game = db.games.find((game) => {
    return game.id === id;
  });

  if (game) {
    Object.assign(game, request.body)
    response.json(game);
  } else {
    response.status(404).send();
  }
});

app.listen(PORT || 8000);