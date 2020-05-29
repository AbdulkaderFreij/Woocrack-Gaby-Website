// Update with your config settings.

module.exports = {

    development: {
      client: 'mysql',
      connection: {
        host : '127.0.0.1',
        port: '3306',
        user : 'abdulkader',
        password : '123',
        database : 'woocrack'
      },
      migrations: {
          directory: __dirname + '/db/migrations',
        },
      seeds: {
          directory: __dirname + '/db/seeds',
        },
    },
//   production: {
//       client: 'mysql',
//       connection: process.env.DATABASE_URL,
//       migrations: {
//           directory: __dirname + '/db/migrations',
//         },
//       seeds: {
//           directory: __dirname + '/db/seeds/production',
//         },
//     },
  };