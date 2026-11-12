/**
 * Cloud Comfort Ride — Shared Company Data, Service Definitions & Asset Resolver
 * Exact reproduction of Cloud-Comfort-Ride/src/data/companyData.ts and src/types/index.ts
 */

export const ASSET_CDN_PRIMARY = 'https://raw.githubusercontent.com/hadush16/Cloud-Comfort-Ride/main/public';
export const ASSET_CDN_SECONDARY = 'https://raw.githubusercontent.com/tsegay123-art/Cloud-Comfort-Ride/main/public';
export const ASSET_CDN_PRODUCTION = 'https://www.cloudmedicaltrans.com';

/**
 * Resolves a relative Cloud-Comfort-Ride public asset path (e.g. '/images/hero-branded-van-panoramic.jpg')
 * to an absolute hosted URL suitable for Wix Custom Elements and Velo components.
 *
 * @param {string} assetPath
 * @returns {string}
 */
export function resolveAssetUrl(assetPath) {
    if (!assetPath) {
        return '';
    }
    if (/^https?:\/\//i.test(assetPath) || /^wix:image:\/\//i.test(assetPath)) {
        return assetPath;
    }
    const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
    return `${ASSET_CDN_PRIMARY}${normalized}`;
}

export const COMPANY_INFO = {
    name: 'Cloud Comfort Ride',
    brandName: 'Cloud Comfort Ride',
    legalName: 'Cloud Comfort Ride LLC',
    tagline: 'Every Ride. More Comfort. More Care.',
    foundedYear: '2023',
    locationCity: 'Seattle, WA',
    address: '1902 E Yesler Way Unit #4, Seattle, WA 98122',
    phone: '+1 (206) 327-4411',
    phoneRaw: '+12063274411',
    phoneDisplay: '(206) 327-4411',
    email: 'info@cloudmedicaltrans.com',
    operatingHours: 'Monday – Sunday: 6:00 AM – 8:00 PM (Emergency dialysis & discharge scheduling available on-call)',
    serviceAreas: [
        'Downtown Seattle & First Hill Medical Hub',
        'Capitol Hill & Central District',
        'Northgate & Shoreline',
        'West Seattle & Burien',
        'Bellevue & Eastside Medical Centers',
        'Renton & South King County',
        'Kirkland & Redmond'
    ],
    stats: [
        { label: 'On-Time Punctuality', value: '99.4%', highlight: 'Strict Medical Scheduling' },
        { label: 'Certified Drivers', value: '100%', highlight: 'CPR & First Aid Verified' },
        { label: 'Fleet Safety Inspections', value: '100%', highlight: 'State & Federal Compliant' },
        { label: 'Facility Partnerships', value: '45+', highlight: 'Dedicated Driver Routes' }
    ]
};

export const BOOKING_SERVICE_OPTIONS = [
    { value: '', label: 'Choose our service', disabled: true },
    { value: 'non_emergency_medical', label: 'Non-emergency medical transportation' },
    { value: 'wheelchair', label: 'Wheelchair transportation' },
    { value: 'senior_private_pay', label: 'Senior & private-pay rides' },
    { value: 'private_transport', label: 'Private transportation' },
    { value: 'hospital_discharge', label: 'Hospital discharge transportation' },
    { value: 'school_transport', label: 'Private-pay school transportation' },
    { value: 'dialysis', label: 'Dialysis appointment transportation' }
];

/**
 * Returns the human-readable title for a service type identifier.
 *
 * @param {string} [type]
 * @returns {string}
 */
export function getServiceTitle(type) {
    if (!type) {
        return 'Non-emergency medical transportation';
    }
    switch (type) {
    case 'non_emergency_medical':
    case 'routine':
        return 'Non-emergency medical transportation';
    case 'wheelchair':
    case 'wheelchair_standard':
        return 'Wheelchair transportation';
    case 'senior_private_pay':
        return 'Senior & private-pay rides';
    case 'private_transport':
        return 'Private transportation';
    case 'hospital_discharge':
    case 'discharge':
        return 'Hospital discharge transportation';
    case 'school_transport':
        return 'Private-pay school transportation';
    case 'dialysis':
        return 'Dialysis appointment transportation';
    case 'therapy':
        return 'Physical therapy transportation';
    default:
        return type;
    }
}

export const SERVICES_DATA = [
    {
        id: 'non_emergency_medical',
        title: 'Non-emergency medical transportation',
        tagline: 'Punctual, safe, and dependable travel to essential medical check-ups and clinic visits.',
        badge: 'Popular Medical Transit',
        description:
            'Our core service is dedicated to assisting you with attending routine check-ups, specialist consultations, and diagnostic appointments across Seattle, ensuring you always make it to essential medical care.',
        longDescription:
            'Navigating Seattle traffic, parking garages, and large medical campus walkways can be exhausting for patients and family members. Cloud Comfort Ride provides dependable curb-to-clinic and door-through-door transit. Our drivers assist you every step of the way, ensuring you arrive relaxed and ready for your appointment.',
        features: [
            'Punctual drop-off 15–20 minutes prior to appointment',
            'Assistance entering and exiting vehicle with patient escorts',
            'Flexible return pickup coordination with medical clinic staff',
            'Comfort-calibrated climate control and smooth ride dynamics',
            'Direct coordination with family caregivers and case managers'
        ],
        idealFor: [
            'Cardiology, oncology, and specialty clinic consultations',
            'Routine diagnostic imaging, scans, and laboratory appointments',
            'Optometry, dental, and podiatry visits',
            'Senior living community residents requiring escorted travel'
        ],
        vehicleType: 'Comfort sedans & low-floor accessible passenger vans',
        imageUrl: '/images/clinic-pickup-sedan.jpg'
    },
    {
        id: 'wheelchair',
        title: 'Wheelchair transportation',
        tagline: 'State-of-the-art ADA hydraulic lifts, ramps, and 4-point Q-Straint tie-down safety.',
        badge: 'ADA Wheelchair Access',
        description:
            'Thoughtful, secure transportation for passengers utilizing manual wheelchairs, power wheelchairs, or mobility scooters, operated by trained professionals.',
        longDescription:
            'Mobility challenges should never prevent anyone from accessing premier healthcare. Our specialized fleet includes ADA-compliant vehicles equipped with precision hydraulic lifts and heavy-duty ramps. Every passenger is secured using certified 4-point Q-Straint tie-down systems and lap/shoulder restraints.',
        features: [
            'Certified 4-point Q-Straint wheelchair tie-downs with lap & shoulder belts',
            'Commercial grade hydraulic wheelchair lifts with safety stop plates',
            'Spacious vehicle interiors accommodating wide-base and motorized chairs',
            'Certified drivers trained on all ADA boarding and securement protocols',
            'Room for up to two family members or companion escorts to travel together'
        ],
        idealFor: [
            'Manual and motorized electric wheelchair users',
            'Mobility scooter riders requiring ramp or lift boarding',
            'Patients with limited weight-bearing capacity needing assisted transit'
        ],
        vehicleType: 'ADA-compliant high-roof transit vans with heavy-duty power lifts',
        imageUrl: '/images/wheelchair-seattle-skyline.jpg'
    },
    {
        id: 'senior_private_pay',
        title: 'Senior & private-pay rides',
        tagline: 'Gentle, courteous door-through-door transit for older adults and private-pay clients.',
        badge: 'Senior & Family Care',
        description:
            'Personalized transportation for seniors attending social outings, community programs, personal appointments, or family gatherings with dedicated driver accompaniment.',
        longDescription:
            'Independence and dignity are at the heart of our senior transit service. Our drivers take extra time to assist older adults from inside their residence, carry bags or mobility aids, and provide stability support throughout the entire trip.',
        features: [
            'Patient, unhurried assistance from front door to destination lobby',
            'Safe storage for foldable walkers, rollators, and personal belongings',
            'Familiar recurring drivers assigned to build comfort and trust',
            'Direct text/phone updates sent to family members and caregivers',
            'Transparent flat-rate private-pay pricing with no surprise surcharges'
        ],
        idealFor: [
            'Seniors living independently or in retirement communities',
            'Personal errands, family gatherings, and community events',
            'Adult day-care program transit across King County',
            'Private-pay clients seeking reliable, dignified point-to-point transit'
        ],
        vehicleType: 'Low-step accessible passenger vans and comfortable luxury sedans',
        imageUrl: '/images/hero-branded-van-panoramic.jpg'
    },
    {
        id: 'private_transport',
        title: 'Private transportation',
        tagline: 'Individual, executive-level private transportation tailored to your personal schedule.',
        badge: 'Dedicated Private Rides',
        description:
            'Exclusive private vehicle service with no shared passengers, customized pickup windows, and flexible wait-and-return options for individuals and families.',
        longDescription:
            'When discretion, privacy, and dedicated attention are paramount, our private transportation service guarantees that you and your party have the entire vehicle reserved. Ideal for executive healthcare appointments, outpatient surgical procedures, and private medical travel.',
        features: [
            'Exclusive vehicle reservation with zero ridesharing or detour stops',
            'Direct point-to-point dispatch on your exact timetable',
            'Complimentary waiting time during short clinical consultations',
            'Discreet, professional drivers adhering to strict privacy protocols',
            'Spacious luggage and mobility equipment accommodation'
        ],
        idealFor: [
            'Private healthcare consultations and executive physical exams',
            'Patients requiring privacy post-treatment or following minor surgery',
            'Longer-distance medical transfers across Western Washington',
            'Family members accompanying loved ones to specialized care centers'
        ],
        vehicleType: 'Premium climate-controlled passenger sedans and executive shuttles',
        imageUrl: '/images/driver-sedan-assistance.jpg'
    },
    {
        id: 'hospital_discharge',
        title: 'Hospital discharge transportation',
        tagline: 'Safe, stress-free transition from hospital bedside directly to your residence.',
        badge: 'Hospital & Clinic Coordination',
        description:
            'Assisting patients and family members with a smooth ride home following an inpatient hospital stay or outpatient clinical release, with bedside escort service.',
        longDescription:
            'Discharge day can be unpredictable and exhausting. We coordinate directly with hospital discharge nurses and social workers to ensure a seamless departure the moment release papers are signed, eliminating hours of waiting in hospital discharge lounges.',
        features: [
            'Bedside pickup and room-to-vehicle escort service',
            'Assistance carrying discharge instructions, personal belongings, and medical equipment',
            'Optional pharmacy stop for immediate prescription pickup on the way home',
            'Safe transfer inside the residence to ensure passenger is settled comfortably',
            'Coordination with family members and home health aides'
        ],
        idealFor: [
            'Inpatient surgical discharges from Swedish, UW Medical, Harborview, or Virginia Mason',
            'Outpatient procedure release requiring an authorized adult escort',
            'Transfers between acute care hospitals and skilled nursing / sub-acute facilities'
        ],
        vehicleType: 'Fully equipped medical transport vans with space for medical equipment & luggage',
        imageUrl: '/images/driver-sedan-assistance.jpg'
    },
    {
        id: 'school_transport',
        title: 'Private-pay school transportation',
        tagline: 'Safe, dependable student transit for children and youth with special support needs.',
        badge: 'Student Transit Care',
        description:
            'Specialized, compassionate transportation for students attending specialized learning centers, therapy academies, and school programs across Seattle and King County.',
        longDescription:
            'Parents and guardians need absolute peace of mind when entrusting their children to transportation providers. Our drivers undergo rigorous Washington State Patrol and FBI background checks, CPR/First Aid certification, and specialized training in assisting young passengers with mobility or sensory needs.',
        features: [
            'Strict background vetting and certified pediatric CPR/First Aid drivers',
            'Direct hand-to-hand transfer between authorized school staff and parents',
            'Consistent morning and afternoon recurring route scheduling',
            'Accommodations for specialized wheelchairs, strollers, and communication devices',
            'Real-time dispatch coordination with guardians and school administrators'
        ],
        idealFor: [
            'Students with physical, mobility, or developmental support needs',
            'Specialized therapy school and behavioral clinic daily transit',
            'Private-pay families needing dependable before-and-after school routes',
            'Door-to-school door transportation in Seattle and Eastside'
        ],
        vehicleType: 'Modern multi-passenger vans with certified safety restraints & booster seating',
        imageUrl: '/images/clean-van-interior.jpg'
    },
    {
        id: 'dialysis',
        title: 'Dialysis appointment transportation',
        tagline: 'Life-sustaining, punctual, recurring travel for hemodialysis patients.',
        badge: 'Critical Care Priority',
        description:
            'Dependable and secure recurring transportation for patients needing regular dialysis treatments across Seattle and King County, strictly honoring clinical chair times.',
        longDescription:
            'Dialysis treatments demand absolute reliability. Being late or missing a session is never an option, and post-dialysis fatigue requires a gentle, respectful ride home. We establish dedicated recurring schedules and assign familiar drivers who understand your specific comfort needs and care routines.',
        features: [
            'Dedicated driver assignments to build trust, comfort, and familiarity',
            'Guaranteed punctual arrival matching your exact dialysis chair times',
            'Gentle post-treatment assistance when patients feel fatigued or lightheaded',
            'Direct communication with dialysis center nursing staff upon arrival',
            'Flexible accommodation for extended treatment run times'
        ],
        idealFor: [
            'Hemodialysis patients with 3x/week recurring schedules',
            'Peritoneal dialysis clinical evaluations and supplies transit',
            'Kidney care center visits across Seattle and King County'
        ],
        vehicleType: 'Specialized wheelchair-accessible vans & climate-controlled shuttles',
        imageUrl: '/images/medical-center-van-doctor.jpg'
    },
    {
        id: 'therapy',
        title: 'Physical therapy transportation',
        tagline: 'Hassle-free, ergonomic travel to keep your rehabilitation on schedule.',
        badge: 'Rehabilitation Support',
        description:
            'Ensuring easy access to physical therapy sessions is crucial for healing. Our specialized transit guarantees a comfortable, pain-free journey to your appointments.',
        longDescription:
            'Whether recovering from joint replacement surgery, stroke rehabilitation, or injury recovery, getting in and out of regular personal cars can cause pain or reinjury. Our vehicles feature wide doors, low step-in heights, assistive grab handles, and ADA ramps.',
        features: [
            'Ergonomic seating preventing strain on newly operated joints',
            'Assistance with walking boots, crutches, canes, and rollators',
            'Careful vehicle ingress and egress guided by trained drivers',
            'Standing reservation slots matching your weekly rehabilitation therapy plan',
            'Zero parking hassle at busy Seattle rehabilitation clinics'
        ],
        idealFor: [
            'Post-orthopedic surgery rehabilitation (hip, knee, spine)',
            'Neurological and stroke rehabilitation programs',
            'Occupational and speech therapy visits',
            'Chiropractic and chronic pain clinic appointments'
        ],
        vehicleType: 'Low-step accessible transport vehicles with stability handles',
        imageUrl: '/images/driver-wellness-center.jpg'
    }
];

export const DRIVER_STANDARDS = [
    {
        title: 'CPR & First Aid Certified',
        description:
            'Every Cloud Comfort driver is certified in Adult/Child CPR, First Aid, and Emergency Patient Care, trained to recognize medical distress and act swiftly.',
        iconName: 'HeartPulse'
    },
    {
        title: 'Rigorous Background Vetting',
        description:
            'Exhaustive background checks including Washington State Patrol criminal history, FBI fingerprinting, driving record checks, and regular drug screening.',
        iconName: 'ShieldCheck'
    },
    {
        title: 'Ramp & Lift Operation Specialists',
        description:
            'Thoroughly trained in operating hydraulic wheelchair lifts, deploying gentle-grade ramps, and executing 4-point Q-Straint vehicle tie-downs.',
        iconName: 'Accessibility'
    },
    {
        title: 'Compassionate Assistance',
        description:
            'Natural empathy, courteous communication, patience, and physical assistance entering, riding, and navigating into medical clinic waiting rooms.',
        iconName: 'Smile'
    },
    {
        title: 'Dedicated Facility Assignments',
        description:
            'We assign the same drivers to recurring routes and medical facilities, fostering familiarity, communication, and deep comfort for patients and clinic staff.',
        iconName: 'Users'
    },
    {
        title: 'Licensed & Regularly Inspected Fleet',
        description:
            'Vehicles undergo strict daily pre-trip checks, professional maintenance logs, and full compliance with Washington State medical transit standards.',
        iconName: 'CarCheck'
    }
];

export const HOW_IT_WORKS = [
    {
        step: '01',
        title: 'Request Your Ride',
        description:
            'Submit your trip details online in under 2 minutes or call our Seattle dispatch at (206) 327-4411. Share your appointment time, pickup location, and mobility needs.'
    },
    {
        step: '02',
        title: 'Dispatch Confirmation',
        description:
            'Our dispatch team reviews your route, assigns a certified driver, and verifies all appointment timing to eliminate late arrival risk. You receive an instant confirmation receipt.'
    },
    {
        step: '03',
        title: 'Door-Through-Door Care',
        description:
            'Your driver arrives punctually, assists you safely from your front door into the vehicle, and escorts you straight into your medical facility or waiting room.'
    }
];

export const TESTIMONIALS = [
    {
        name: 'Eleanor Vance',
        role: 'Dialysis Patient (3x/Week)',
        location: 'Capitol Hill, Seattle',
        quote:
            'Cloud Comfort Ride has been a lifesaver for my dialysis sessions. My driver Marcus is always 10 minutes early, greets me with a warm smile, and makes sure I get home safely even when I feel exhausted after treatment.',
        serviceUsed: 'Dialysis Transportation',
        rating: 5
    },
    {
        name: 'David & Karen M.',
        role: 'Family Caregivers',
        location: 'Bellevue, WA',
        quote:
            'We could not be more thankful for Cloud Comfort Ride. Transporting my 84-year-old mother to her orthopedic visits used to be an ordeal. Their wheelchair lift van and courteous drivers made every journey stress-free.',
        serviceUsed: 'Wheelchair Transportation',
        rating: 5
    },
    {
        name: 'Sarah L., MSW',
        role: 'Hospital Social Worker & Care Coordinator',
        location: 'Swedish Medical Center, Seattle',
        quote:
            'As a discharge planner, reliability is everything. Cloud Comfort Ride is our first call for dependable patient rides. Their drivers are professional, empathetic, and communicate promptly with our floor staff.',
        serviceUsed: 'Hospital Discharge Transit',
        rating: 5
    }
];

export const FAQS = [
    {
        category: 'booking',
        question: 'How far in advance should I book my medical transportation?',
        answer:
            'We recommend booking 24 to 48 hours in advance whenever possible to secure your preferred pickup window. However, we also accommodate same-day ride requests for urgent clinic consults, dialysis adjustments, and hospital discharges based on availability.'
    },
    {
        category: 'booking',
        question: 'How does booking confirmation work?',
        answer:
            'Once you submit a request online or over the phone, our Seattle dispatch team reviews the route schedule and vehicle requirements. You will receive an immediate confirmation email and summary with your unique booking reference number. Our dispatcher is also available directly at (206) 327-4411.'
    },
    {
        category: 'service',
        question: 'Can a family member, caregiver, or service animal ride with me?',
        answer:
            'Yes! One family caregiver, companion, or personal health aide is welcome to accompany the passenger at no additional charge. Certified service animals are always accommodated in accordance with ADA guidelines.'
    },
    {
        category: 'safety',
        question: 'What qualifications and training do your drivers have?',
        answer:
            'All Cloud Comfort drivers undergo comprehensive background screening (state criminal background checks, motor vehicle records, and drug testing). Every driver is CPR and First Aid certified, trained in passenger assistance techniques, and certified in operating wheelchair hydraulic lifts and securement systems.'
    },
    {
        category: 'safety',
        question: 'What types of wheelchairs can your vehicles accommodate?',
        answer:
            'Our wheelchair-accessible vehicles easily accommodate standard manual wheelchairs, heavy-duty bariatric wheelchairs, and high-back motorized power chairs. Every wheelchair is secured using four-point Q-Straint floor tie-downs and complete lap/shoulder harnesses.'
    },
    {
        category: 'payment',
        question: 'How does billing and payment work?',
        answer:
            'We believe in transparent, straightforward billing without hidden surcharges. We accept private pay (credit/debit cards, electronic payments), health savings accounts (HSA/FSA), and work directly with healthcare facilities, case management programs, and third-party transportation brokers.'
    },
    {
        category: 'service',
        question: 'What areas do you serve?',
        answer:
            'We proudly serve all of Seattle (First Hill, Downtown, Capitol Hill, Northgate, West Seattle, Central District) as well as the broader King County region including Bellevue, Kirkland, Renton, Burien, Shoreline, and SeaTac.'
    }
];
