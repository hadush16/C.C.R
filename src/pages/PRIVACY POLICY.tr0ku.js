// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// Cloud Comfort Ride — Privacy Policy Page Controller (PRIVACY POLICY.tr0ku.js)

import { initCloudComfortPage } from 'public/veloPageBridge';

$w.onReady(function () {
    initCloudComfortPage($w, {
        route: '/privacy',
        pageName: 'PRIVACY POLICY'
    });
});
