
// $ node --harmony examples/a

var ETCD = require('..');
var object = require('entangle')(new ETCD);

var config = object('config');

config.on('change', function(){
  console.log(config.title);
});