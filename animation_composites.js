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
        [[[-115.13051231350391, 34.11651899416291],
          [-115.13051231350391, 21.17691619854002],
          [-94.78383262600391, 21.17691619854002],
          [-94.78383262600391, 34.11651899416291]]], null, false),
    subcontinent = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-138.6254363874298, 56.17514064627142],
          [-138.6254363874298, 1.327433575686042],
          [-57.853952012429794, 1.327433575686042],
          [-57.853952012429794, 56.17514064627142]]], null, false),
    asia = 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[51.82657301798142, 51.492724857310385],
          [51.82657301798142, 9.597044310384],
          [124.77579176798142, 9.597044310384],
          [124.77579176798142, 51.492724857310385]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .filterDate('2019-02-08', '2022-02-07')
  .select([0]);

var band_viz = {
  min: 1750, // min: 1491
  max: 1900, // max: 2352
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

// Make a day-of-year sequence from 1 to 364 with a given step.
var step = 28
var doyList = ee.List.sequence(1, 364, step);

// Map over the list of days to build a list of image composites.
var ch4CompList = doyList.map(function(startDoy) {
  // Ensure that startDoy is a number.
  startDoy = ee.Number(startDoy);

  // Filter images by date range; starting with the current startDate and
  // ending 15 days later. Reduce the resulting image collection by median.
  return collection
    .filter(ee.Filter.calendarRange(startDoy, startDoy.add(step - 1), 'day_of_year'))
    .reduce(ee.Reducer.median());
});

// Convert the image List to an ImageCollection.
var ch4CompCol = ee.ImageCollection.fromImages(ch4CompList);

var subset = collection.filterDate('2019-02-12', '2019-03-11'); // to use in animation

var scale = 5000 // this number is important - it affects the grain and spatial positions of the data, as well as the size of the pixels that are counted as null

var myVis = ch4CompCol.map(function(i) {
  return i.reproject(i.projection().atScale(scale)).visualize(band_viz).clip(mixed_rect)
});

var gifParams = {
  'region': mixed_rect,
  'dimensions': 600, // this helps control whether the pixels get maxed out
  'crs': 'EPSG: 4326', // same as data
  'framesPerSecond': 2
};

print(myVis.getVideoThumbURL(gifParams)); // get a gif url that can be downloaded by right clicking
print(ui.Thumbnail(myVis, gifParams)); // display gif in console