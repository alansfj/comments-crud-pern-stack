const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')
const {
  getAllComments,
  getComment,
  postComment,
  editComment,
  deleteComment,
} = require("./controllers/comments.controllers");

const PORT = process.env.PORT || 3100

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")))

app.get("/comments", getAllComments);

app.get("/comments/:id", getComment);

app.post("/comments", postComment);

app.put("/comments/:id", editComment);

app.delete("/comments/:id", deleteComment);

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
