These files are archived copies of Google Earth Engine scripts I wrote for a school project in which I performed change detection analyses on TROPOMI methane data to try and identify possible large leak events coming from oil and natural gas production sites in the Permian Basin.  

Read the full project paper here: https://drive.google.com/file/d/1bWrOVr1GtMD-LwUuKSRbmXqz4waDip4c/view?usp=sharing

## File Descriptions

Below, I briefly describe the main script files that I used in my analysis.  The other files in this repository were basically used for scratch purposes.

Note: XCH4 refers to column-averaged dry-air methane mole fraction, measured in parts per billion.  

| name | description |
| -------- | --------- |
| animation_composites.js | Generates animation of seasonal methane cycling based on a composite of 3 years of TROPOMI data ordered by day-of-year and binned into 28-day medians. |
| average_all.js | Renders a map of XCH4 per pixel averaged over an entire 3-year period of TROPOMI data. |
| collection_subtraction.js | Renders maps of areas that experienced "temporal methane anomalies" - times where the XCH4 jumped by at least 100 ppb from one day to the next. |
| seasonal_subtraction.js | Renders maps representing seasonal changes in XCH4, including average fall/spring change as well as interannual variations in seasonal patterns. |
