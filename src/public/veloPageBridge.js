/**
 * Cloud Comfort Ride — Wix Velo Page & Master Controller Bridge
 *
 * 1. Collapses, hides, and removes all legacy Wix default template sections, headers, footers,
 *    placeholder galleries, repeaters, and forms so the old template is never displayed.
 * 2. Connects Wix Velo Page Code ($w) to the <cloud-comfort-ride> Custom Element
 *    (src/public/custom-elements/cloud-comfort-ride.js) regardless of its assigned Wix element ID.
 * 3. Synchronizes all 9 internal Cloud Comfort Ride routes with wix-location-frontend and wix-seo-frontend.
 * 4. Bridges booking and contact submissions to backend/dispatch.jsw.
 */

import wixLocationFrontend from 'wix-location-frontend';
import wixSeoFrontend from 'wix-seo-frontend';
import { submitBookingRequest, submitContactInquiry } from 'backend/dispatch';
import {
    COMPANY_INFO,
    SERVICES_DATA,
    DRIVER_STANDARDS,
    FAQS,
    BOOKING_SERVICE_OPTIONS
} from 'public/companyData';
import { DESIGN_TOKENS, PAGE_METADATA, MEDICAL_BUSINESS_JSON_LD } from 'public/designTokens';

/**
 * Candidate IDs for the <cloud-comfort-ride> Custom Element on any Wix page.
 * Wix assigns #customElement1 by default when a Custom Element is added in the Editor.
 */
const CUSTOM_ELEMENT_SELECTORS = [
    '#customElement1',
    '#cloudComfortApp',
    '#cloudComfortRide',
    '#ccrCustomElement',
    '#customElement2'
];

/**
 * Candidate IDs for Wix HTML / IFrame components (including Fullscreen Page's #fullscreenPage1).
 */
const HTML_COMPONENT_SELECTORS = [
    '#fullscreenPage1',
    '#cloudComfortHtml',
    '#html1',
    '#htmlEmbed1'
];

/**
 * Exact legacy Wix template elements on masterPage.js (from .wix/types/masterPage/masterPage.d.ts)
 * Note: #pagesContainer1 and #pageGroup1 are the active page host containers and MUST NOT be collapsed.
 */
const LEGACY_MASTER_ELEMENTS = [
    '#header1',
    '#footer1',
    '#section2',
    '#section11',
    '#menuContainer1',
    '#expandableMenu1',
    '#expandableMenu2',
    '#horizontalMenu1',
    '#form3',
    '#button3',
    '#vectorImage7',
    '#vectorImage8',
    '#text2',
    '#text27',
    '#text28',
    '#text29',
    '#text30',
    '#text31',
    '#text32',
    '#text33',
    '#text34',
    '#text35',
    '#box31',
    '#box32',
    '#box33',
    '#box34',
    '#box35',
    '#box36',
    '#box37',
    '#box38',
    '#box39',
    '#box40',
    '#box41',
    '#box42',
    '#box43'
];

/**
 * Exact legacy Wix template child elements across HOME.j12bc.js, CONTACT.b802y.js,
 * ACCESSIBILITY STATEMENT.jbm86.js, and PRIVACY POLICY.tr0ku.js (from .wix/types/<pageId>/<pageId>.d.ts).
 */
const LEGACY_PAGE_CHILD_ELEMENTS = [
    // Boxes (#box1 - #box30)
    '#box1', '#box2', '#box3', '#box4', '#box5', '#box6', '#box7', '#box8', '#box9', '#box10',
    '#box11', '#box12', '#box13', '#box14', '#box15', '#box16', '#box17', '#box18', '#box19', '#box20',
    '#box21', '#box22', '#box23', '#box24', '#box25', '#box26', '#box27', '#box28', '#box29', '#box30',
    // Texts (#text3 - #text26)
    '#text3', '#text4', '#text5', '#text6', '#text7', '#text8', '#text9', '#text10',
    '#text11', '#text12', '#text13', '#text14', '#text15', '#text16', '#text17', '#text18',
    '#text19', '#text20', '#text21', '#text22', '#text23', '#text24', '#text25', '#text26',
    // Galleries, Repeaters, Forms, Media, Buttons, Vectors, Lines
    '#gallery1', '#gallery2',
    '#repeater1', '#repeater2',
    '#form1', '#form2',
    '#imageX1', '#imageX2',
    '#videoBox1',
    '#button1', '#button2',
    '#vectorImage1', '#vectorImage2', '#vectorImage3', '#vectorImage4', '#vectorImage5', '#vectorImage6',
    '#line1'
];

/**
 * Legacy Wix template sections across all pages (from .wix/types/<pageId>/<pageId>.d.ts).
 */
const LEGACY_PAGE_SECTIONS = [
    '#section1',
    '#section3',
    '#section4',
    '#section5',
    '#section6',
    '#section7',
    '#section8',
    '#section9',
    '#section10'
];

/**
 * Safely selects a Wix element or array of elements without throwing.
 *
 * @param {Function} $wInstance
 * @param {string} selector
 * @returns {Object|null}
 */
function safeSelect($wInstance, selector) {
    try {
        const el = $wInstance(selector);
        if (!el) {
            return null;
        }
        if (Array.isArray(el)) {
            return el.length > 0 ? el : null;
        }
        if (el.id || typeof el.collapse === 'function' || typeof el.hide === 'function' || typeof el.setAttribute === 'function') {
            return el;
        }
        return null;
    } catch (err) {
        return null;
    }
}

/**
 * Collapses, hides, and deletes a single Wix element if supported, unless its ID is in protectedIds.
 *
 * @param {Object} el
 * @param {Set<string>} protectedIds
 */
function suppressLegacyElement(el, protectedIds) {
    if (!el || typeof el !== 'object') {
        return;
    }
    const cleanId = el.id ? String(el.id).replace(/^#/, '') : '';
    if (cleanId && protectedIds && protectedIds.has(cleanId)) {
        return;
    }
    try {
        if (typeof el.collapse === 'function') {
            el.collapse();
        }
    } catch (err) {
        // Ignore if element cannot be collapsed
    }
    try {
        if (typeof el.hide === 'function') {
            el.hide();
        }
    } catch (err) {
        // Ignore if element cannot be hidden
    }
    try {
        if (typeof el.delete === 'function') {
            el.delete();
        }
    } catch (err) {
        // Ignore if element cannot be deleted
    }
}

/**
 * Collects the ID of an active Custom Element / HTML Component and all of its ancestor containers
 * (e.g., the parent #section1) so we never collapse the section hosting <cloud-comfort-ride>.
 *
 * @param {Array<Object>} activeMountElements
 * @returns {Set<string>}
 */
function collectProtectedAncestorIds(activeMountElements) {
    const protectedIds = new Set([
        'page1',
        'pagesContainer1',
        'pageGroup1',
        'masterPage'
    ]);

    activeMountElements.forEach((el) => {
        let cursor = el;
        let depth = 0;
        while (cursor && depth < 15) {
            if (cursor.id) {
                protectedIds.add(String(cursor.id).replace(/^#/, ''));
            }
            cursor = cursor.parent;
            depth += 1;
        }
    });

    return protectedIds;
}

/**
 * Finds all mounted Custom Elements (<cloud-comfort-ride>) on the current Wix page.
 *
 * @param {Function} $wInstance
 * @returns {Array<Object>}
 */
function findCustomElements($wInstance) {
    const found = [];
    const seenIds = new Set();

    // 1. Check type selector $w('CustomElement')
    const byType = safeSelect($wInstance, 'CustomElement');
    if (Array.isArray(byType)) {
        byType.forEach((el) => {
            if (el && typeof el.setAttribute === 'function') {
                const id = el.id || `ce-${found.length}`;
                if (!seenIds.has(id)) {
                    seenIds.add(id);
                    found.push(el);
                }
            }
        });
    } else if (byType && typeof byType.setAttribute === 'function') {
        seenIds.add(byType.id || 'ce-0');
        found.push(byType);
    }

    // 2. Check explicit candidate IDs (#customElement1, #cloudComfortApp, etc.)
    CUSTOM_ELEMENT_SELECTORS.forEach((selector) => {
        const el = safeSelect($wInstance, selector);
        if (el && !Array.isArray(el) && typeof el.setAttribute === 'function') {
            const id = el.id || selector;
            if (!seenIds.has(id)) {
                seenIds.add(id);
                found.push(el);
            }
        }
    });

    return found;
}

/**
 * Finds all mounted HTML / IFrame components on the current Wix page.
 *
 * @param {Function} $wInstance
 * @returns {Array<Object>}
 */
function findHtmlComponents($wInstance) {
    const found = [];
    const seenIds = new Set();

    ['HtmlComponent', 'IFrame'].forEach((typeSelector) => {
        const byType = safeSelect($wInstance, typeSelector);
        if (Array.isArray(byType)) {
            byType.forEach((el) => {
                if (el && el.id && !seenIds.has(el.id)) {
                    seenIds.add(el.id);
                    found.push(el);
                }
            });
        } else if (byType && byType.id && !seenIds.has(byType.id)) {
            seenIds.add(byType.id);
            found.push(byType);
        }
    });

    HTML_COMPONENT_SELECTORS.forEach((selector) => {
        const el = safeSelect($wInstance, selector);
        if (el && !Array.isArray(el)) {
            const id = el.id || selector;
            if (!seenIds.has(id)) {
                seenIds.add(id);
                found.push(el);
            }
        }
    });

    return found;
}

/**
 * Applies Cloud Comfort Ride SEO title, meta tags, and Schema.org MedicalBusiness JSON-LD.
 *
 * @param {string} route
 */
function applySeoMetadata(route) {
    const meta = PAGE_METADATA[route] || PAGE_METADATA['/'];
    try {
        if (wixSeoFrontend && typeof wixSeoFrontend.setTitle === 'function') {
            wixSeoFrontend.setTitle(meta.title);
        }
        if (wixSeoFrontend && typeof wixSeoFrontend.setMetaTags === 'function') {
            wixSeoFrontend.setMetaTags([
                { name: 'description', content: meta.description },
                { property: 'og:title', content: meta.title },
                { property: 'og:description', content: meta.description },
                { property: 'og:type', content: 'website' },
                { name: 'theme-color', content: DESIGN_TOKENS.light.navy }
            ]);
        }
        if (wixSeoFrontend && typeof wixSeoFrontend.setStructuredData === 'function') {
            wixSeoFrontend.setStructuredData([MEDICAL_BUSINESS_JSON_LD]);
        }
    } catch (err) {
        // Ignore SEO errors in preview environments where wixSeoFrontend may be restricted
    }
}

/**
 * Resolves the active Cloud Comfort Ride route from wixLocationFrontend query/path or fallback page option.
 *
 * @param {string} defaultRoute
 * @returns {string}
 */
function resolveActiveRoute(defaultRoute) {
    try {
        if (wixLocationFrontend && wixLocationFrontend.query) {
            const queryRoute = wixLocationFrontend.query.route || wixLocationFrontend.query.view;
            if (queryRoute && typeof queryRoute === 'string') {
                return queryRoute.startsWith('/') ? queryRoute : `/${queryRoute}`;
            }
        }
        if (wixLocationFrontend && Array.isArray(wixLocationFrontend.path) && wixLocationFrontend.path.length > 0) {
            const lastSegment = String(wixLocationFrontend.path[wixLocationFrontend.path.length - 1] || '').toLowerCase();
            if (lastSegment === 'contact') {
                return '/contact';
            }
            if (lastSegment === 'privacy-policy' || lastSegment === 'privacy') {
                return '/privacy';
            }
            if (lastSegment === 'accessibility-statement' || lastSegment === 'safety-drivers') {
                return '/safety-drivers';
            }
            if (lastSegment === 'services') {
                return '/services';
            }
            if (lastSegment === 'about') {
                return '/about';
            }
            if (lastSegment === 'book-a-ride' || lastSegment === 'book-online') {
                return '/book-a-ride';
            }
            if (lastSegment === 'my-bookings') {
                return '/my-bookings';
            }
            if (lastSegment === 'terms') {
                return '/terms';
            }
        }
    } catch (err) {
        // Fallback to defaultRoute
    }
    return defaultRoute || '/';
}

/**
 * Initializes masterPage.js: removes the default Wix template Header (#section2 / #header1),
 * Footer (#section11 / #footer1), and old navigation menus so only Cloud Comfort Ride's
 * own Header and Footer are displayed.
 *
 * @param {Function} $wInstance
 */
export function initCloudComfortMaster($wInstance) {
    const protectedIds = new Set(['pagesContainer1', 'pageGroup1', 'masterPage', 'page1']);

    // Ensure the main page container is expanded and visible
    ['#pagesContainer1', '#pageGroup1'].forEach((selector) => {
        const container = safeSelect($wInstance, selector);
        if (container) {
            try {
                if (typeof container.expand === 'function') {
                    container.expand();
                }
                if (typeof container.show === 'function') {
                    container.show();
                }
            } catch (err) {
                // Ignore
            }
        }
    });

    // Suppress all legacy masterPage header/footer/menu template elements
    LEGACY_MASTER_ELEMENTS.forEach((selector) => {
        const el = safeSelect($wInstance, selector);
        if (el) {
            suppressLegacyElement(el, protectedIds);
        }
    });
}

/**
 * Initializes a Wix Velo page:
 * 1. Locates the <cloud-comfort-ride> Custom Element (or HTML component) and protects its parent section.
 * 2. Removes all legacy Wix template sections, boxes, galleries, repeaters, and forms on the page.
 * 3. Configures routing, SEO, and backend dispatch event handlers.
 *
 * @param {Function} $wInstance
 * @param {Object} options
 * @param {string} options.route
 * @param {string} [options.pageName]
 */
export function initCloudComfortPage($wInstance, options = {}) {
    const activeRoute = resolveActiveRoute(options.route || '/');
    applySeoMetadata(activeRoute);

    // 1. Discover Custom Elements (<cloud-comfort-ride>) and HTML components on the page
    const customElements = findCustomElements($wInstance);
    const htmlComponents = findHtmlComponents($wInstance);
    const activeMounts = [...customElements, ...htmlComponents];

    // 2. Determine which section(s) host the Custom Element so we never collapse its parent section
    const protectedIds = collectProtectedAncestorIds(activeMounts);

    // If no Custom Element has been placed inside a specific section yet, keep #section1 expanded
    // as the clean host container while deleting all legacy template boxes/texts inside #section1.
    if (activeMounts.length === 0) {
        protectedIds.add('section1');
    }

    // 3. Remove all legacy Wix template child elements (boxes, texts, repeaters, galleries, forms, vectors)
    LEGACY_PAGE_CHILD_ELEMENTS.forEach((selector) => {
        const el = safeSelect($wInstance, selector);
        if (el) {
            suppressLegacyElement(el, protectedIds);
        }
    });

    // 4. Remove all legacy Wix template sections that do not contain <cloud-comfort-ride>
    LEGACY_PAGE_SECTIONS.forEach((selector) => {
        const sectionEl = safeSelect($wInstance, selector);
        if (sectionEl) {
            suppressLegacyElement(sectionEl, protectedIds);
        }
    });

    // 5. Dynamically inspect #page1 children to catch any remaining template elements
    const pageRoot = safeSelect($wInstance, '#page1');
    if (pageRoot && Array.isArray(pageRoot.children)) {
        pageRoot.children.forEach((child) => {
            suppressLegacyElement(child, protectedIds);
        });
    }

    // 6. Initialize <cloud-comfort-ride> Custom Element(s) and bind Velo backend dispatch events
    customElements.forEach((customEl) => {
        try {
            if (typeof customEl.expand === 'function') {
                customEl.expand();
            }
            if (typeof customEl.show === 'function') {
                customEl.show();
            }
            customEl.setAttribute('initial-route', activeRoute);
            customEl.setAttribute('route', activeRoute);
        } catch (err) {
            // Ignore attribute error
        }

        if (typeof customEl.on === 'function') {
            customEl.on('bookingSubmitted', async (event) => {
                const detail = event && event.detail ? event.detail : {};
                const booking = detail.booking || detail;
                try {
                    const receipt = await submitBookingRequest(booking);
                    if (receipt && receipt.bookingId) {
                        customEl.setAttribute('last-booking-receipt', JSON.stringify(receipt));
                    }
                } catch (err) {
                    // Client localStorage voucher is already saved
                }
            });

            customEl.on('contactSubmitted', async (event) => {
                const detail = event && event.detail ? event.detail : {};
                const inquiry = detail.inquiry || detail;
                try {
                    const receipt = await submitContactInquiry(inquiry);
                    if (receipt && receipt.ok) {
                        customEl.setAttribute('last-contact-receipt', JSON.stringify(receipt));
                    }
                } catch (err) {
                    // Client localStorage inquiry is already saved
                }
            });

            customEl.on('routeChanged', (event) => {
                const detail = event && event.detail ? event.detail : {};
                if (detail.path) {
                    applySeoMetadata(detail.path);
                }
            });
        }
    });

    // 7. Sync Wix Location URL changes into the Custom Element
    try {
        if (wixLocationFrontend && typeof wixLocationFrontend.onChange === 'function') {
            wixLocationFrontend.onChange(() => {
                const updatedRoute = resolveActiveRoute(options.route || '/');
                applySeoMetadata(updatedRoute);
                customElements.forEach((customEl) => {
                    try {
                        customEl.setAttribute('route', updatedRoute);
                    } catch (err) {
                        // Ignore
                    }
                });
            });
        }
    } catch (err) {
        // Ignore if wixLocationFrontend.onChange is unavailable
    }

    // 8. Initialize Wix HTML / IFrame components if present
    htmlComponents.forEach((htmlComp) => {
        try {
            if (typeof htmlComp.expand === 'function') {
                htmlComp.expand();
            }
            if (typeof htmlComp.show === 'function') {
                htmlComp.show();
            }
            if (typeof htmlComp.allowFullScreen === 'function') {
                htmlComp.allowFullScreen();
            }
        } catch (err) {
            // Ignore
        }

        if (typeof htmlComp.postMessage === 'function') {
            htmlComp.postMessage({
                type: 'CCR_INIT',
                route: activeRoute,
                companyInfo: COMPANY_INFO,
                services: SERVICES_DATA,
                driverStandards: DRIVER_STANDARDS,
                faqs: FAQS,
                bookingOptions: BOOKING_SERVICE_OPTIONS,
                designTokens: DESIGN_TOKENS,
                structuredData: MEDICAL_BUSINESS_JSON_LD
            });
        }

        if (typeof htmlComp.onMessage === 'function') {
            htmlComp.onMessage(async (event) => {
                const msg = event && event.data ? event.data : null;
                if (!msg || typeof msg !== 'object') {
                    return;
                }
                if (msg.type === 'bookingSubmitted' || msg.type === 'CCR_BOOKING_SUBMITTED') {
                    const booking = (msg.payload && msg.payload.booking) || msg.payload || msg.booking;
                    if (booking) {
                        try {
                            const res = await submitBookingRequest(booking);
                            if (typeof htmlComp.postMessage === 'function') {
                                htmlComp.postMessage({
                                    type: 'CCR_BOOKING_CONFIRMED',
                                    payload: res
                                });
                            }
                        } catch (err) {
                            // Handled by frontend
                        }
                    }
                } else if (msg.type === 'contactSubmitted' || msg.type === 'CCR_CONTACT_SUBMITTED') {
                    const inquiry = (msg.payload && msg.payload.inquiry) || msg.payload || msg.inquiry;
                    if (inquiry) {
                        try {
                            const res = await submitContactInquiry(inquiry);
                            if (typeof htmlComp.postMessage === 'function') {
                                htmlComp.postMessage({
                                    type: 'CCR_CONTACT_CONFIRMED',
                                    payload: res
                                });
                            }
                        } catch (err) {
                            // Handled by frontend
                        }
                    }
                }
            });
        }
    });
}
