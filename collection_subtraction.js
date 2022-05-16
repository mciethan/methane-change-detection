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
    ee.Geometry.Point([-100.92238098616099, 23.692650116656637]),
    wells = 
    /* color: #c210d6 */
    /* shown: false */
    ee.Geometry.MultiPoint(
        [[-103.90256010781847, 25.9055965839314],
         [-102.32168376633145, 31.415637123292704]]),
    perm_rect = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-106.11375464640241, 33.983903471336745],
          [-106.11375464640241, 29.070089004369997],
          [-100.01634253702741, 29.070089004369997],
          [-100.01634253702741, 33.983903471336745]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .filterDate('2019-02-08', '2022-02-08')
  .select([0])
  .map(function(image){return image.clip(mixed_rect)});
  
var threshold = ee.Number(100)
var startZ = ee.Date('2021-08-05'); 
var endZ = ee.Date('2022-02-07');
var startY = ee.Date('2021-07-17'); 
var endY = ee.Date('2021-08-03');
var startX = ee.Date('2020-12-28'); 
var endX = ee.Date('2021-07-13');
var startW = ee.Date('2020-06-13'); 
var endW = ee.Date('2020-12-26');
var startV = ee.Date('2020-01-19'); 
var endV = ee.Date('2020-06-11');
var start = ee.Date('2019-02-08'); 
var end = ee.Date('2020-01-09');  // 2020-01-10, 2021-08-04, ... have 0 bands
var step = 1

var n_days = end.difference(start,'day').round();
var n_daysV = endV.difference(startV,'day').round();
var n_daysW = endW.difference(startW,'day').round();
var n_daysX = endX.difference(startX,'day').round();
var n_daysY = endY.difference(startY,'day').round();
var n_daysZ = endZ.difference(startZ,'day').round();

var band_viz = {
  min: threshold.subtract(1),
  max: threshold, 
  palette: ['black', 'red'],
};

var dates = ee.List.sequence(0,n_days.subtract(1), step);
var make_datelist = function(n) {
  return start.advance(n,'day');
};
dates = dates.map(make_datelist);
var datesV = ee.List.sequence(0,n_daysV.subtract(1), step);
var make_datelistV = function(n) {
  return startV.advance(n,'day');
};
datesV = datesV.map(make_datelistV);
var datesW = ee.List.sequence(0,n_daysW.subtract(1), step);
var make_datelistW = function(n) {
  return startW.advance(n,'day');
};
datesW = datesW.map(make_datelistW);
var datesX = ee.List.sequence(0,n_daysX.subtract(1), step);
var make_datelistX = function(n) {
  return startX.advance(n,'day');
};
datesX = datesX.map(make_datelistX);
var datesY = ee.List.sequence(0,n_daysY.subtract(1), step);
var make_datelistY = function(n) {
  return startY.advance(n,'day');
};
datesY = datesY.map(make_datelistY);
var datesZ = ee.List.sequence(0,n_daysZ.subtract(1), step);
var make_datelistZ = function(n) {
  return startZ.advance(n,'day');
};
datesZ = datesZ.map(make_datelistZ);

var all_dates = dates.cat(datesV).cat(datesW).cat(datesX).cat(datesY).cat(datesZ)
print(all_dates)

var subtractedList = all_dates.map(function(dt) {
  var tmrw = ee.Date(dt).advance(step, 'day')
  var before_range = ee.DateRange(dt, tmrw);
  var after_range = ee.DateRange(tmrw, tmrw.advance(step, 'day'));
  return collection.filterDate(after_range).mean()
    .subtract(collection.filterDate(before_range).mean())
})

var subtractedCol = ee.ImageCollection.fromImages(subtractedList)

var scale = 7000 // this number is important - it affects the grain and spatial positions of the data, as well as the size of the pixels that are counted as null

var myVis = subtractedCol.map(function(i) {
  return i.reproject(i.projection().atScale(scale)).visualize(band_viz).clip(mixed_rect)
});

var gifParams = {
  'region': mixed_rect,
  'dimensions': 300, // this helps control whether the pixels get maxed out
  'crs': 'EPSG: 4326', // same as data
  'framesPerSecond': 120 // max: 120
};

// print(myVis.getVideoThumbURL(gifParams)); // get a gif url that can be downloaded by right clicking
// print(ui.Thumbnail(myVis, gifParams)); // display gif in console

var thresh_counts = subtractedCol.map(function(i) {
  var anoms = i.gt(threshold).selfMask()
  var ct = anoms.reduceRegion({
    geometry: mixed_rect,
    reducer: ee.Reducer.count(),
    scale: scale
  })
  return anoms.set({'count_gt_thresh': ee.Number(ct.get('CH4_column_volume_mixing_ratio_dry_air'))})
})
print(thresh_counts)
var anomalies = thresh_counts.filter(ee.Filter.gt('count_gt_thresh', 0)).filter(ee.Filter.gt('system:index', '900'))
print(anomalies)
var days = ee.Number.parse(anomalies.first().get('system:index'))
print(days)
var first_anom = ee.Date(start.advance(days, 'day'))
var first_anom_date = first_anom.format('YYYY-MM-dd')
print(first_anom_date, typeof first_anom_date)
var layer_title = first_anom_date.getInfo()
print(layer_title, typeof layer_title)
var fst = anomalies.first()
print(fst)
var after_date = ee.Date(first_anom.advance(1, 'day')).format('YYYY-MM-dd').getInfo()

var bin_viz = {
  min: 0,
  max: 1,
  palette: ['black', 'red'],
};

var ch4_viz = {
  min: 1750, // min: 1491
  max: 1950, // max: 2352, default: 1900
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

var anoms_viz = {
  min: 1, 
  max: 2, 
  palette: ['red', 'purple']
};

var next = ee.Date(first_anom.advance(1, 'day'))
var end = ee.Date(next.advance(1, 'day'))

var bfour = collection.filterDate(first_anom, next).mean()
var aftr = collection.filterDate(next, end).mean()

var areaImage = anomalies.sum().multiply(ee.Image.pixelArea());
var stats = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: mixed_rect,
  crs: 'EPSG:32614', // UTM 14N meters // Texas Central NAD83 (feet)
  scale: 7000
});
print(stats)
print(mixed_rect.area({'maxError': 1}))


Map.addLayer(bfour, ch4_viz, layer_title)
Map.addLayer(aftr, ch4_viz, after_date)
Map.addLayer(fst, bin_viz, "anomaly area(s)")
Map.addLayer(anomalies.sum(), anoms_viz, "all anoms")
Map.addLayer(perm_rect, {color: "cyan"}, "perm", true, 0.3)
Map.addLayer(mixed_rect, {color: "gray"}, "mixed", true, 0.3)
