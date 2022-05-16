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
         [-108.54536450527847, 30.48730460596639]]),
    ri_sites = /* color: #1752d6 */ee.Geometry.MultiPoint(
        [[-71.34989810546897, 41.80936954642603],
         [-71.3409717138674, 41.799644553338815],
         [-71.4892871435549, 41.69923743106894],
         [-71.48104739746115, 41.68026540563989],
         [-71.47898746093772, 41.64948806641809],
         [-71.45976138671897, 41.6294749071107],
         [-71.15901065429709, 41.76892435863995],
         [-71.13978458007834, 41.740238898037454],
         [-70.79920840820334, 41.728966102487426],
         [-70.75045657714865, 41.700262786560934],
         [-70.60969424804709, 41.740238898037454],
         [-70.56918216308615, 41.630501374159465],
         [-70.18946719726584, 41.799644553338815],
         [-70.14002872070334, 41.79043004041848],
         [-70.70994449218772, 41.969363515985926],
         [-70.70033145507834, 41.95915224455653]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .filterDate('2019-02-08', '2019-03-08') // this went to 2022-02-08 at one point, but this is faster
  .select([0]);

var band_viz = {
  min: 1750, // min: 1491
  max: 1900, // max: 2352, default: 1900
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

var img = collection.mean()
// var scale = 5000 // this number is important - it affects the grain and spatial positions of the data, as well as the size of the pixels that are counted as null
// var mask = img.mask().not().selfMask()
// Map.addLayer(mask.reproject(img.projection().atScale(scale)), {}, 'mask pixels') // these will appear white
// Map.addLayer(img.reproject(img.projection().atScale(scale)), band_viz, 'S5P CH4 mean');
Map.addLayer(img, band_viz, 'S5P CH4 mean')
Map.centerObject(perm, 8);