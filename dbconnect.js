var pgp = require('pg-promise')();

//db connect string
var con = process.env.DATABASE_URL || 'postgres://npqasiwaemucmm:e3957a2831921db77732a6677da46574476957600c649568b449a8442764f3e7@ec2-54-247-101-202.eu-west-1.compute.amazonaws.com:5432/d8m8khsgfiqpk9';
var db = pgp(con);

module.exports = db;
