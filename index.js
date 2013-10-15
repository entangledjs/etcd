
/**
 * Module dependencies.
 */

var Redis = require('entangle-redis');
var etcd = require('etcd');

/**
 * Expose `Driver`.
 */

module.exports = Driver;

/**
 * Initialize an etcd driver with optional
 * etcd `client` and `dir` defaulting
 * to "/entangle/objects".
 *
 * @param {String} [dir]
 * @param {Object} [client]
 * @api public
 */

function Driver(dir, client) {
  this.dir = dir || 'entangle/objects';
  this.etcd = client || etcd;
  var redis = new Redis;
  this.pub = redis.pub.bind(redis);
  this.sub = redis.sub.bind(redis);
}

/**
 * Load object by `id` and invoke `fn(null, obj)`.
 *
 * @param {String} id
 * @param {Function} fn
 * @api public
 */

Driver.prototype.load = function(id, fn){
  var key = this.dir + '/' + id;
  this.etcd.get(key, function(err, json){
    if (err && 100 == err.code) return fn(null, {});
    if (err) return fn(err);
    if (!json) return fn(null, {});
    fn(null, JSON.parse(json));
  });
};

/**
 * Save object by `id` and invoke `fn(err)`.
 *
 * @param {String} id
 * @param {Object} obj
 * @param {Function} [fn]
 * @api public
 */

Driver.prototype.save = function(id, obj, fn){
  fn = fn || function(){};
  var key = this.dir + '/' + id;
  this.etcd.set(key, JSON.stringify(obj), fn);
};

/**
 * Remove object by `id`.
 *
 * @param {String} id
 * @param {Function} [fn]
 * @api public
 */

Driver.prototype.remove = function(id, fn){
  fn = fn || function(){};
  var key = this.dir + '/' + id;
  this.etcd.del(key, fn);
};
