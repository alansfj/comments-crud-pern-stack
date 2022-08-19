const pool = require("../db");

const getAllComments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM comments");

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

const getComment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM comments WHERE id = $1", [
      id,
    ]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

const postComment = async (req, res) => {
  try {
    const { email, description } = req.body;

    const result = await pool.query(
      "INSERT INTO comments (email, description) VALUES ($1, $2) RETURNING *",
      [email, description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, description } = req.body;

    const result = await pool.query(
      "UPDATE comments SET email = $1, description = $2 WHERE id = $3 RETURNING *",
      [email, description, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM comments WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

module.exports = {
  getAllComments,
  getComment,
  postComment,
  editComment,
  deleteComment,
};
