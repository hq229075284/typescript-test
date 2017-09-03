var fs = require('fs')
var path = require('path')
var shell=require('shelljs')

function readDir(_path) {
  var filenames = fs.readdirSync(_path, {encoding: 'utf8'})
  filenames.map(one => {
    var stat = fs.statSync(path.join(_path, one))
    if (stat.isDirectory()) {
      readDir(path.join(_path, one))
    } else if (/\.ts$/.test(one)) {
      shell.exec(`npm run compile -- --outDir ${_path} ${path.join(_path, one)}`)
    }
  })
}

readDir(path.join(__dirname, '../type-modules'))
