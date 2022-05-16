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
        [[[-115.13051231350391, 34.11651899416291],
          [-115.13051231350391, 21.17691619854002],
          [-94.78383262600391, 21.17691619854002],
          [-94.78383262600391, 34.11651899416291]]], null, false),
    subcontinent = 
    /* color: #d6c9c5 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-168.85981138742983, 72.18461636850952],
          [-168.85981138742983, 12.992105516854267],
          [-51.613717637429794, 12.992105516854267],
          [-51.613717637429794, 72.18461636850952]]], null, false),
    label_pos = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([-100.92238098616099, 23.692650116656637]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .filterDate('2019-02-08', '2022-02-07')
  .select([0]);
  
var fall = collection
  .filter(ee.Filter.calendarRange(9, 10, 'month'))
  .mean();
  
var spring = collection
  .filter(ee.Filter.calendarRange(3, 4, 'month'))
  .mean();
  
var fall21 = collection.filterDate('2021-01-01', '2021-12-31')
  .filter(ee.Filter.calendarRange(9, 10, 'month'))
  .mean();
  
var spring21 = collection.filterDate('2021-01-01', '2021-12-31')
  .filter(ee.Filter.calendarRange(3, 4, 'month'))
  .mean();
  
var fall20 = collection.filterDate('2020-01-01', '2020-12-31')
  .filter(ee.Filter.calendarRange(9, 10, 'month'))
  .mean();
  
var spring20 = collection.filterDate('2020-01-01', '2020-12-31')
  .filter(ee.Filter.calendarRange(3, 4, 'month'))
  .mean();
  
var season_diff = fall.subtract(spring);
var diff20 = fall20.subtract(spring20);
var diff21 = fall21.subtract(spring21);

var changeVis = {
  min: -50, 
  max: 50, 
  palette: ['cyan', 'gray', 'red']
};
Map.addLayer(season_diff, changeVis, 'all years');

var diffs_by_year = diff21.subtract(diff20).abs()
var g12 = diffs_by_year

var diffsVis = {
  min: 14, 
  max: 50, 
  palette: ['white', 'red']
};

Map.addLayer(diffs_by_year, diffsVis, 'diffs by year')

var dir_change = diff21.multiply(diff20)

var dcVis = {
  min: -48, 
  max: -47, 
  palette: ['red', 'black']
};

Map.addLayer(dir_change, dcVis, "change_dir")