// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// Cloud Comfort Ride — Accessibility & Safety Standards Page Controller (ACCESSIBILITY STATEMENT.jbm86.js)

import { initCloudComfortPage } from 'public/veloPageBridge';

$w.onReady(function () {
    initCloudComfortPage($w, {
        route: '/safety-drivers',
        pageName: 'ACCESSIBILITY STATEMENT'
    });
});
