var mysql = require("mysql"),
    fs = require("fs-extra"),
    path = require("path"),
    q = require("q"),
    Database;

Database = function(opts) {
  var that = this,
      prop;
  this.connection = mysql.createConnection(opts.conn);
  for (prop in opts) {
    if(opts.hasOwnProperty(prop)) {
      that[prop] = opts[prop];
    }
  }
  return that;
}

Database.prototype.init = function(cb) {
  var pathToCreate = path.join(this.pathToSql, "createdb.sql"),
      def = q.defer(),
      contents,
      lines,
      curPromise,
      nextPromise,
      wrapSql = function(conn, statement) {
        var sqldef = q.defer();
        conn.query(statement, (err) => {
          if(err) {
            sqldef.reject(err);
          } else {
            sqldef.resolve(true);
          }
        });
        return sqldef.promise;
      };
  fs.readFile(pathToCreate, (err, buffer) => {
    if(err) {
      def.reject(err);
    } else {
      contents = buffer.toString("utf-8");
      lines = contents.split("\n");
      curPromise = def.promise;
      lines.map((e) => {
        if(e.trim() === "") {
          return;
        }
        nextPromise = wrapSql(this.connection, e.trim());
        curPromise.then(nextPromise);
        curPromise = nextPromise;
      });
      curPromise.done();
    }
  });
  cb();
  return def.promise;
};

Database.prototype.hook = function (req, res, next) {
  console.log("HOOKING IN NOW");
  req.db = this;
  next();
};

module.exports = Database;
