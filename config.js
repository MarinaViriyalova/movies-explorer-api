const { JWT_SECRET = 'dev-key' } = process.env;
const { PORT = 3000 } = process.env;
const { DB_ADDRESS = 'mongodb://localhost:27017/moviesdb' } = process.env;
const { NODE_ENV = 'dev' } = process.env;

module.exports = {
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
  NODE_ENV,
};
