var fs = require("fs-extra"),
    path = require("path"),
    filesToCheck = [
      "db.conf.json",
      "api.conf.json"
    ];
module.exports = function configCheck (pathToConfig) {
  filesToCheck.map((filename) => {
    var fullpath = path.join(pathToConfig, filename);
    if(!fs.existsSync(fullpath)) {
      throw new Error(`You need to make a local copy of ${filename} at the path ${fullpath}. Look for a similarly named file with a '.example' extension.`)
    } else {
      return true;
    }
  });
}
