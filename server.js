const express = require("express");
const app = express();
const path = require("path");
const {User} = require('./db/index').models
const {syncAndSeed} = require('./db/index')
const port = process.env.PORT || 3000;

app.use(
  require("express-session")({
    secret: process.env.SECRET
  })
);

app.use(express.json());
  
syncAndSeed()
.then(()=>{
  app.listen(port, () => console.log(`listening on port ${port}`));
})
.catch( e => console.error(e))


const users = {
  moe: {
    id: 1,
    name: "moe",
    favoriteWord: "foo"
  },
  lucy: {
    id: 2,
    name: "lucy",
    favoriteWord: "bar"
  }
};

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.post("/api/sessions", (req, res, next) => {
  const user = users[req.body.username];
  if (user) {
    req.session.user = user;
    return res.send(user);
  }
  next({ status: 401 });
});

app.get("/api/sessions", (req, res, next) => {
  const user = req.session.user;
  if (user) {
    return res.send(user);
  }
  next({ status: 401 });
});

app.delete("/api/sessions", (req, res, next) => {
  req.session.destroy();
  res.sendStatus(204);
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
