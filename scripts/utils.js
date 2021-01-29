const path = require('path')
const glob = require('glob')

const getEntries = (srcDir = process.cwd, pagesDir = 'pages') => {
  const files = glob.sync('**/*.ts', { cwd: srcDir })
  const pagesPath = path.join(srcDir, pagesDir)
  console.log(pagesPath)
  const entries = files
    .map(file => {
      return {
        path: path.join(srcDir, file),
        key: file.substr(0, file.length - 3),
        value: `./src/${file}`,
      }
    })
    .filter(item => {
      if (item.key === 'app') {
        return true
      }
      if (item.path.startsWith(pagesPath)) {
        return true
      }
      return false
    })
    .reduce((prev, item) => {
      prev[item.key] = item.value
      return prev
    }, {})

  return entries
}
module.exports = {
  getEntries,
}
