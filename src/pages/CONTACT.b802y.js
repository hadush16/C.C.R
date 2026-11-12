// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// Cloud Comfort Ride — Contact & Dispatch Page Controller (CONTACT.b802y.js)

import { initCloudComfortPage } from 'public/veloPageBridge';

$w.onReady(function () {
    initCloudComfortPage($w, {
        route: '/contact',
        pageName: 'CONTACT'
    });
});
