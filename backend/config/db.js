const mongoose = require('mongoose');

const host = process.env.HOST
const user = process.env.MONGO_USER
const password = process.env.PASSWORD
const cluster = process.env.CLUSTER
const database = process.env.DATABASE

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: "majority"
}

const parseOptions = (options) => {
  let str = '';
  for (let key in options) {
    str += `${key}=${options[key]}&`
  }
  return str;
}

const url = `${host}://${user}:${password}@${cluster}/${database}?${parseOptions(options)}`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log( `
  Database Connected Successfully

  `);
}).catch(err => {
  console.error("Error Occured while connecting to database: " + err);
});

