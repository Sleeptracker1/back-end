const server = require("./api/server");

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n===   The API Server is running on port ${port}   ===\n`);
});
