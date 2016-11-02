import * as path from 'path'
import * as tilereduce from 'tile-reduce'
import * as fs from 'fs'
import * as turf from '@turf/helpers'

const collection = turf.featureCollection([])
const sources = [
  { name: 'osmdata', mbtiles: path.join(__dirname, 'latest-planet.mbtiles')},
]
const user = 'DenisCarriere'

tilereduce({
  sources,
  map: path.join(__dirname, 'scripts', 'places.js'),
  mapOptions: {
    user,
  },
  // bbox: [-76.7368, 44.2172, -74.9947, 45.8870],
  zoom: 12,
  output: fs.createWriteStream('hey'),
})
.on('start', () => {
  console.log('starting')
})
.on('map', (tile, workerId) => {
  // console.log(`about to process [${ tile }] on worker ${ workerId }`)
})
.on('reduce', (result: Array<GeoJSON.Feature<any>>) => {
  result.map(feature => collection.features.push(feature))
})
.on('end', (error: any) => {
  console.log(`Total: ${ collection.features.length }`)
  fs.writeFileSync(`places.geojson`, JSON.stringify(collection, null, 4))
})
