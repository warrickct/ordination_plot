/*
Resources:
https://jonlefcheck.net/2012/10/24/nmds-tutorial-in-r/
https://www.statisticshowto.datasciencecentral.com/bray-curtis-dissimilarity/
*/

// const d3 = require('d3');
// const papa = require('papaparse');
import * as papa from 'papaparse';
import * as d3 from 'd3';
import { map } from 'd3';

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

var data;

papa.parse('./sample_data.csv', {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function (results) {
        createOrdinationPlot(results.data);
    }
});

const createOrdinationPlot = (data) => {
    // console.log(data);
    let siteDictionary = createBrayCurtisMatrix(data);
}

/**
 * Create site keys with organism measurements as values
 * @param {*} data 
 */
const createBrayCurtisMatrix = (data) => {
    console.log(data);
    let brayCurtMatrix = {};
    data.map(site => {
        // console.log(site);
        let siteTotalOtus = 0
        for (let item in site) {
            let value = site[item];
            if (!isNaN(value)) {
                siteTotalOtus += value;
            }
        }
        data.map(site2 => {
            // skip own site
            if (site2 != site) {
                let siteKey = site2['site'] + site['site'];
                console.log(siteKey);
                console.log(calculateBrayCurtis(site2, site));
                brayCurtMatrix[siteKey] = calculateBrayCurtis(site2, site);
            }
        });
    })
    console.log(brayCurtMatrix);
}

const calculateBrayCurtis = (site2, site) => {
    console.log(site2, site);
    // iterate each otu in both sites
    // 1 - (total off lesser counts of common otus * n-sites)/(total count of species in all sites)
    let sumLesser = 0;
    let totalSpecimenCount = 0;
    Object.keys(site).map(key => {
        if (key !== "site") {
            // console.log(key);
            // console.log(site[key]);
            let lesser = Math.min(site[key], site2[key]);
            // console.log('lesser: ' + lesser);
            sumLesser += Math.min(site[key], site2[key]);
            totalSpecimenCount += site[key] + site2[key];
        }
    });
    // console.log('sum of lessers: ' + sumLesser);
    // console.log('total spec count: ' + totalSpecimenCount);
    // assuming site count will be two. Possibly expand this to be multiple sites in the future?
    let brayCurt = 1 - (sumLesser * 2) / (totalSpecimenCount);
    return brayCurt;
}