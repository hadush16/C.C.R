/**
 * Cloud Comfort Ride — Design System Tokens & SEO Schema
 * Exact match to Cloud-Comfort-Ride/tailwind.config.js, src/index.css, and index.html
 */

export const GOOGLE_FONTS_HREF =
    'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Manrope:wght@500;600;700;800;900&display=swap';

export const DESIGN_TOKENS = {
    light: {
        navy: '#061f46',
        navyDark: '#041329',
        navyBottom: '#04152f',
        blue: '#123e77',
        blueLight: '#eaf2ff',
        blueHover: '#092754',
        gold: '#f3bf28',
        goldDark: '#bd8b09',
        goldAccent: '#986800',
        goldShadow: '#c99308',
        goldSoft: '#fff5d8',
        cream: '#f7f9fc',
        creamAlt: '#fbf8f0',
        ink: '#122747',
        muted: '#65758b',
        line: '#dce4ee'
    },
    dark: {
        navy: '#092754',
        navyDark: '#030d1a',
        blue: '#1d4ed8',
        gold: '#f3bf28',
        goldDark: '#f59e0b',
        goldAccent: '#fcd34d',
        goldShadow: '#855f00',
        cream: '#0b192e',
        ink: '#f1f5f9',
        muted: '#94a3b8',
        line: '#1e293b',
        bodyBg: '#040d1a'
    },
    typography: {
        fontSans: '"DM Sans", system-ui, -apple-system, sans-serif',
        fontHeading: 'Manrope, system-ui, sans-serif',
        headingLetterSpacing: '-1.5px',
        bodyLineHeight: 1.65
    },
    borderRadius: {
        dtCard: '16px',
        dtPhoto: '14px',
        dtBtn: '10px'
    },
    shadows: {
        dtButton: '0 4px 0 #c99308',
        dtCard: '0 15px 40px rgba(16, 44, 77, 0.04)',
        dtPhoto: '0 20px 60px rgba(8, 33, 64, 0.18)',
        dtNote: '0 12px 35px rgba(16, 44, 77, 0.12)'
    }
};

export const PAGE_METADATA = {
    '/': {
        title: 'Cloud Comfort Ride | Safe, Reliable Medical Transportation Seattle',
        description:
            'Cloud Comfort Ride provides safe, reliable, and caring non-emergency medical transportation in Seattle and surrounding Washington communities.'
    },
    '/services': {
        title: 'Specialized Medical Transit Services | Cloud Comfort Ride Seattle',
        description:
            'Explore wheelchair accessible vans, dialysis transportation, hospital discharge escort, and routine clinic transit across Seattle & King County.'
    },
    '/about': {
        title: 'About Cloud Comfort Ride | Seattle Non-Emergency Medical Transport',
        description:
            'Founded in 2023 in Seattle, Cloud Comfort Ride delivers punctual, compassionate healthcare transportation with CPR & First Aid certified drivers.'
    },
    '/safety-drivers': {
        title: 'Driver Safety & Fleet Standards | Cloud Comfort Ride Seattle',
        description:
            'Our 6-point driver safety standard: CPR/First Aid certified, Washington State Patrol background checked, and Q-Straint ADA lift specialists.'
    },
    '/book-a-ride': {
        title: 'Book Your Medical Ride Online | Cloud Comfort Ride Seattle',
        description:
            'Schedule non-emergency medical transportation, wheelchair lift vans, or dialysis rides online with Seattle dispatch.'
    },
    '/contact': {
        title: 'Contact Seattle Dispatch | Cloud Comfort Ride (206) 327-4411',
        description:
            'Contact Cloud Comfort Ride at 1902 E Yesler Way Unit #4, Seattle, WA 98122 or call (206) 327-4411 for medical appointment transportation.'
    },
    '/my-bookings': {
        title: 'My Medical Trip Bookings & Vouchers | Cloud Comfort Ride',
        description:
            'Review your scheduled medical transportation requests and print official trip confirmation vouchers.'
    },
    '/privacy': {
        title: 'Privacy Policy | Cloud Comfort Ride LLC',
        description:
            'Privacy policy and patient confidentiality practices for Cloud Comfort Ride LLC (Cloud Medical Transportation) in Seattle, WA.'
    },
    '/terms': {
        title: 'Terms of Service | Cloud Comfort Ride LLC',
        description:
            'Non-emergency medical transportation service terms and scheduling policies for Cloud Comfort Ride LLC.'
    }
};

export const MEDICAL_BUSINESS_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Cloud Comfort Ride',
    alternateName: 'Cloud Medical Transportation',
    image: 'https://www.cloudmedicaltrans.com/cloud-medical-van.jpg',
    '@id': 'https://www.cloudmedicaltrans.com',
    url: 'https://www.cloudmedicaltrans.com',
    telephone: '+1-206-327-4411',
    email: 'info@cloudmedicaltrans.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '1902 E Yesler Way Unit #4',
        addressLocality: 'Seattle',
        addressRegion: 'WA',
        postalCode: '98122',
        addressCountry: 'US'
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 47.6019,
        longitude: -122.3065
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '06:00',
        closes: '20:00'
    },
    priceRange: '$$',
    areaServed: ['Seattle', 'King County', 'Bellevue', 'Renton', 'Kent', 'Kirkland'],
    medicalSpecialty: 'Non-Emergency Medical Transportation'
};
