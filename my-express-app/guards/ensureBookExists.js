async function ensureBookExists(req, res, next) {
  try {
    let results = await db(`SELECT * FROM books WHERE id = ${req.params.id}`);
    if (results.data.length === 1) {
      // Book was found; save it in response obj for the route function to use
      res.locals.book = results.data[0];
      // Let next middleware function run
      next();
    } else {
      res.status(404).send({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

module.exports = ensureBookExists;
