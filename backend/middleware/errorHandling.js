const errorResponder = (err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: err.message || "Internal Server Error",
  });
};

const invalidPathHandler = (req, res) => {
  res.status(404).send("Page not found");
};

export { errorResponder, invalidPathHandler };
