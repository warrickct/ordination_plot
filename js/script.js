/*
Resources:
https://jonlefcheck.net/2012/10/24/nmds-tutorial-in-r/
https://www.statisticshowto.datasciencecentral.com/bray-curtis-dissimilarity/
*/

// const d3 = require('d3');
// const papa = require('papaparse');
import * as papa from 'papaparse';
import * as d3 from 'd3';

// define the position of communities in multidim space
// reduce the dimensions, usually by 2
// construct an initial configuration of the samples in 2-dimensions.
// Regress distances in this initial configuration against the observed (measured) distances.

/*
Bray-curtis dissimilarity calculation:

For a simple example, consider two aquariums;

Tank one: 6 goldfish, 7 guppies and 4 rainbow fish,
Tank two: 10 goldfish and 6 rainbow fish.
To calculate Bray-Curtis, let’s first calculate Cij (the sum of only the lesser counts for each species found in both sites). Goldfish are found on both sites; the lesser count is 6. Guppies are only on one site, so they can’t be added in here. Rainbow fish, though, are on both, and the lesser count is 4.
So Cij = 6 + 4 = 10.

Si ( total number of specimens counted on site i) = 6 + 7 + 4 = 17, and
Sj (total number of specimens counted on site j) = 10 + 6 = 16.

So our BCij = 1 – (2 * 10) / (17 + 16), or 0.39.
*/

let data = papa.parse("./sample_data.csv", {
    complete: (results) => {
        console.log("test");
        console.log(results);
        // handleData(results);
    }
});

// const handleData = (results) => {
//     console.log();
// }