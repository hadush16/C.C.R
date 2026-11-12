// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// Cloud Comfort Ride — Homepage Controller (HOME.j12bc.js)

import { initCloudComfortPage } from 'public/veloPageBridge';

$w.onReady(function () {
    initCloudComfortPage($w, {
        route: '/',
        pageName: 'HOME'
    });
});
