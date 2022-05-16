/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var perm = /* color: #d63000 */ee.Geometry.MultiPoint(
        [[-104.73440184445496, 32.20292756004894],
         [-101.92838970087462, 32.27354344221612],
         [-102.19755473993712, 30.661890176049244],
         [-104.73539653681212, 30.60989929018868]]),
    mixed_rect = 
    /* color: #ffc82d */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-106.91273887600391, 34.189252212017024],
          [-106.91273887600391, 29.257823984706246],
          [-100.84828575100391, 29.257823984706246],
          [-100.84828575100391, 34.189252212017024]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .filterDate('2019-02-08', '2022-02-07')
  .select([0]);

var band_viz = {
  min: 1750, // min: 1491
  max: 1900, // max: 2352
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

var before = collection.filterDate('2019-02-12', '2019-02-13');
var after = collection.filterDate('2019-02-13', '2019-02-14');  // will use something like this to do image collection subtractions

var subset = collection.filterDate('2019-02-12', '2019-03-11'); // to use in animation

var region = ee.Geometry.Polygon(
  [[[-101.9, 32.2],
    [-101.9, 30.6],
    [-104.7, 32.2],
    [-104.7, 30.6]]],  // order matters - these are currently out of order and made the x shape
  null, false
);

var img = collection.filterDate('2019-02-12', '2019-03-11').mean()
print(img)
var scale = 5000 // this number is important - it affects the grain and spatial positions of the data, as well as the size of the pixels that are counted as null
var mask = img.mask().not().selfMask()
Map.addLayer(mask.reproject(img.projection().atScale(scale)), {}, 'mask pixels')

var count = mask.reduceRegion({
      reducer: ee.Reducer.count(),
      geometry: mixed_rect,
      scale: scale,
      maxPixels: 1e13
  })
  
print(count)  // number of null tiles (units around 70km a side) in img. does not correspond to 

Map.addLayer(img.reproject(img.projection().atScale(scale)), band_viz, 'S5P CH4 mean');
Map.centerObject(perm, 8);

var myVis = subset.map(function(i) {
  return i.reproject(i.projection().atScale(scale)).visualize(band_viz).clip(mixed_rect)
});

var gifParams = {
  'region': mixed_rect,
  'dimensions': 250, // this helps control whether the pixels get maxed out
  'crs': 'EPSG: 4326', // 4326
  'framesPerSecond': 16
};

print(myVis.getVideoThumbURL(gifParams)); // export gif
print(ui.Thumbnail(myVis, gifParams)); // display gif in console