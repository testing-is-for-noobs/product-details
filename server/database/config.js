if (process.env.NODE_ENV === 'development') {
  module.exports = {
    user: 'root',
    database: 'legoland',
  };
}

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    host: 'mysqldetails',
    user: 'root',
    password: 'docker',
    database: 'legoland',
  };
}