
// $ node --harmony examples/b

var ETCD = require('..');
var object = require('entangle')(new ETCD);

var config = object('config');

var titles = [
  'Hello',
  'World',
  'Some',
  'Stuff'
];

setInterval(function(){
  config.title = titles[Math.random() * titles.length | 0];
}, 500);

config.on('change', function(){
  console.log(config.title);
});