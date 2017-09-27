var serv = require(process.argv[2] || './serverData.json')

var dataGenerator = require('./updateModules/dataGenerator')
const generator = new dataGenerator(serv)
generator.generateArticlesFromFile();
generator.generateTreeMenuFromFile()