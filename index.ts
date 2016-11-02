import * as path from 'path'
import * as tilereduce from 'tile-reduce'
import * as fs from 'fs'

let buildings = 0
const sources = [
  { name: 'osmdata', mbtiles: path.join(__dirname, 'canada.mbtiles')},
]


tilereduce({
  sources,
  log: true,
  map: path.join(__dirname, 'scripts', 'buildings.js'),
  mapOptions: {
    bufferSize: 4,
  },
  bbox: [-80.144234, 43.6749409, -79.69519600000001, 43.9897851],
  zoom: 12,
  output: fs.createWriteStream('hey'),
})
.on('start', () => {
  console.log('starting')
})
.on('map', (tile, workerId) => {
  // console.log(`about to process [${ tile }] on worker ${ workerId }`)
})
.on('reduce', (result: number) => {
  buildings += result
})
.on('end', () => {
  console.log(buildings)
})
