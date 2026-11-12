// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// Cloud Comfort Ride — Fullscreen Application Page Controller (Fullscreen Page.msnpi.js)

import { initCloudComfortPage } from 'public/veloPageBridge';

$w.onReady(function () {
    initCloudComfortPage($w, {
        route: '/',
        pageName: 'Fullscreen Page'
    });
});
