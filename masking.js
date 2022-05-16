/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var perm = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(
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
          [-100.84828575100391, 34.189252212017024]]], null, false),
    geometry = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.MultiPoint(
        [[-107.82576001309097, 32.92644168317204],
         [-103.85969555996597, 32.529026839348354],
         [-103.88716138027847, 30.77091067333445],
         [-108.54536450527847, 30.48730460596639]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .filterDate('2019-02-08', '2022-02-07')
  .select([0]);

var band_viz = {
  min: 1750, // min: 1491
  max: 2150, // max: 2352, default: 1900
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

var img = collection.filterDate('2019-02-12', '2020-03-11').mean()
print(img)
var scale = 5000 // this number is important - it affects the grain and spatial positions of the data, as well as the size of the pixels that are counted as null
var mask = img.mask().not().selfMask()
Map.addLayer(mask.reproject(img.projection().atScale(scale)), {}, 'mask pixels') // these will appear white

var count = mask.reduceRegion({
      reducer: ee.Reducer.count(),
      geometry: mixed_rect,
      scale: scale,
      maxPixels: 1e13
  })
  
print(count)  // number of null pixels -- dependent on scale

Map.addLayer(img.reproject(img.projection().atScale(scale)), band_viz, 'S5P CH4 mean');
Map.centerObject(perm, 8);