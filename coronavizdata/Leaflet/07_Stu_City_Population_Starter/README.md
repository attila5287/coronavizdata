# City Population

In this activity, we will replace each city's pinpoint marker with a graduated circle, with radii proportional to city population.

## Instructions

1. Navigate to the [logic.js](Unsolved/logic.js) file and modify the code so that each city is represented by a circle vector layer.

2. Each vector layer should have:

   1. A `color` property set to `white`

   2. A `fillColor` property set to `purple`

   3. A `fillOpacity` property set to `.75`

   4. A `radius` equal to the city's population divided by 40 (you'll probably want to create a function for this)

3. Make sure that for each vector layer you include has a popup with the city's name and population.

## Hints

* Refer to the [Leaflet docs for Path Options](http://leafletjs.com/reference-1.0.3.html#path-option) if stuck creating vector layers.
