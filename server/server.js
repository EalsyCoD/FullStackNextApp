const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config')

const app = express();
const port = config.port || 9090

const secretKey = config.secretKey;

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'username' && password === 'password') {
    
    jwt.sign({ username }, secretKey, { expiresIn: '2m' }, (err, token) => {
      if (err) {
        res.status(500).json({ error: 'Error creating token' });
      } else {
        res.json({ token });
      }
    });
  } else {
    res.status(401).json({ error: 'The username or password you entered is incorrect' });
  }
});


app.post('/refresh-token', (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ error: 'No token' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ error: 'The token has expired. Re-authentication required' });
    }

    const user = decoded.user;

    const newToken = jwt.sign({ user }, secretKey, { expiresIn: '2m' });
    res.json({ token: newToken });
  });
});

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});