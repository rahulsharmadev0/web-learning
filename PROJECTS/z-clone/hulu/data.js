const contentCategories = [
    {
        id: 'tv-shows',
        title: 'TV Shows',
        subtitle: 'Past & Current Seasons',
        image: "https://c.animaapp.com/me0erxs9BYR2U8/assets/original-1.jpg",
        alt: 'Family Guy Library Poster'
    },
    {
        id: 'movies',
        title: 'Movies',
        subtitle: 'New & Classic',
        image: "https://c.animaapp.com/me0erxs9BYR2U8/assets/original-2.jpg",
        alt: 'Planet of the Apes - Library Poster'
    },
    {
        id: 'originals',
        title: 'Hulu Originals',
        subtitle: 'Groundbreaking',
        image: "https://c.animaapp.com/me0erxs9BYR2U8/assets/original-3.jpg",
        alt: 'Shogun - Library Poster'
    },
    {
        id: 'premiums',
        title: 'Premiums',
        subtitle: 'Add-on',
        image: "https://c.animaapp.com/me0erxs9BYR2U8/assets/original-4.jpg",
        alt: 'House of the Dragon Library Poster',
        note: 'Premium network add-ons available for an additional cost'
    }
];

const liveTVContent = {
    badge: "TRY HULU (WITH ADS) + LIVE TV FREE FOR 3 DAYS",
    title: "Watch Live TV From 95 Channels",
    description: "Get top national and local channels on Hulu (With Ads) + Live TV with your favorite live sports, news, and events - plus the entire Hulu streaming library. With Unlimited DVR, store Live TV recordings for up to nine months and fast-forward through your DVR content. Includes access to endless entertainment with Disney+ and live sports with ESPN+.",
    primaryButton: {
        text: "START YOUR FREE TRIAL",
        href: "/signup/go/live?utm_source=welcome&utm_medium=welcome-live-tv-cta"
    },
    disclaimer: "Hulu (With Ads) + Live TV plan $82.99/mo. after 3-day free trial (if any) unless canceled. Cancel anytime. Regional restrictions, blackouts and Live TV terms apply. Access content from each service separately. Location data required to watch certain content. Offer valid for eligible subscribers only.",
    channelsButtonText: "VIEW CHANNELS IN YOUR AREA →",
};

const footerSections = [
    {
        id: 'browse',
        title: 'BROWSE',
        links: [
            { id: 'streaming-library', label: 'Streaming Library', href: '/content' },
            { id: 'live-tv', label: 'Live TV', href: '/live-tv' },
            { id: 'live-news', label: 'Live News', href: '/live-news' },
            { id: 'live-sports', label: 'Live Sports', href: '/live-sports' },
            { id: 'tv-shows', label: 'TV Shows', href: '/hub/tv' },
            { id: 'movies', label: 'Movies', href: '/hub/movies' },
            { id: 'originals', label: 'Originals', href: '/hub/originals' },
            { id: 'networks', label: 'Networks', href: '/hub/networks' },
            { id: 'kids', label: 'Kids', href: '/hub/kids' },
            { id: 'fx', label: 'FX', href: '/fx-on-hulu' },
            { id: 'hbo-max', label: 'HBO Max', href: '/hbomax' },
            { id: 'cinemax', label: 'Cinemax', href: '/cinemax' },
            { id: 'paramount-showtime', label: 'Paramount+ with SHOWTIME', href: '/paramount-plus-with-showtime' },
            { id: 'starz', label: 'STARZ', href: '/starz' },
            { id: 'disney-bundle-basic', label: 'Disney+, Hulu, ESPN+ Bundle Basic ', href: '/hulu-disney-espn-bundle-offer' },
            { id: 'disney-bundle-premium', label: 'Disney+, Hulu, ESPN+ Bundle Premium', href: '/disney-bundle-hulu-no-ads' },
            { id: 'disney-hulu-bundle', label: 'Disney+, Hulu Bundle', href: '/disney-hulu-bundle' },
            { id: 'disney-hulu-hbo-bundle', label: 'Disney+, Hulu, HBO Max Bundle', href: '/disney-hulu-hbomax-bundle' },
            { id: 'student-discount', label: 'Student Discount', href: '/student' }
        ]
    },
    {
        id: 'help',
        title: 'HELP',
        links: [
            { id: 'account-billing', label: 'Account & Billing', href: "https://help.hulu.com/article/hulu-manage-subscription?utm_source=hulu&utm_medium=web&utm_campaign=site-footer&utm_content=manage-subscription" },
            { id: 'plans-pricing', label: 'Plans & Pricing', href: "https://help.hulu.com/article/hulu-how-much-does-hulu-cost?utm_source=hulu&utm_medium=web&utm_campaign=site-footer&utm_content=how-much-does-hulu-cost" },
            { id: 'supported-devices', label: 'Supported Devices', href: "https://help.hulu.com/article/hulu-supported-devices?utm_source=hulu&utm_medium=web&utm_campaign=site-footer&utm_content=supported-devices" },
            { id: 'accessibility', label: 'Accessibility', href: "https://help.hulu.com/article/hulu-accessibility-features?utm_source=hulu&utm_medium=web&utm_campaign=site-footer&utm_content=accessibility-features" }
        ]
    },
    {
        id: 'about',
        title: 'ABOUT US',
        links: [
            { id: 'shop-hulu', label: 'Shop Hulu', href: '#hulushop' },
            { id: 'press', label: 'Press', href: '/press' },
            { id: 'jobs', label: 'Jobs', href: '/jobs' },
            { id: 'contact', label: 'Contact', href: "https://help.hulu.com/article/hulu-how-to-contact-hulu?utm_source=hulu&utm_medium=web&utm_campaign=site-footer&utm_content=how-to-contact-hulu" },
            { id: 'guides', label: 'Guides | What to Watch', href: "https://hulu.com/guides" }
        ]
    }
];

const socialLinks = [
    { id: 'facebook', label: 'Hulu Facebook', href: "https://www.facebook.com/hulu", icon: "https://c.animaapp.com/me0erxs9BYR2U8/assets/facebook.svg" },
    { id: 'twitter', label: 'Hulu X', href: 'https://x.com/hulu', icon: "https://c.animaapp.com/me0erxs9BYR2U8/assets/x_logo.svg" },
    { id: 'youtube', label: 'Hulu Youtube', href: "https://www.youtube.com/channel/UCE5mQnNl8Q4H2qcv4ikaXeA", icon: "https://c.animaapp.com/me0erxs9BYR2U8/assets/youtube.svg" },
    { id: 'instagram', label: 'Hulu Instagram', href: "https://www.instagram.com/hulu", icon: "https://c.animaapp.com/me0erxs9BYR2U8/assets/instagram.svg" }
];

const legalLinks = [
    { id: 'about-ads', label: 'About Ads', href: "https://info.evidon.com/pub_info/3920?v=1&nt=0&nw=false", icon: "https://c.animaapp.com/me0erxs9BYR2U8/assets/icon1.png" },
    { id: 'tv-parental-guidelines', label: 'TV Parental Guidelines', href: "http://www.tvguidelines.org/" },
    { id: 'subscriber-agreement', label: 'Subscriber Agreement', href: '/subscriber_agreement' },
    { id: 'privacy-policy', label: 'Privacy Policy', href: "https://privacy.thewaltdisneycompany.com/en/current-privacy-policy/" },
    { id: 'childrens-privacy', label: "Children's Online Privacy Policy", href: "https://privacy.thewaltdisneycompany.com/en/for-parents/childrens-online-privacy-policy/" },
    { id: 'do-not-sell', label: 'Do Not Sell or Share My Personal Information', href: '/do-not-sell-my-info' },
    { id: 'state-privacy-rights', label: 'Your US State Privacy Rights', href: '/ca-privacy-rights' },
    { id: 'terms-of-use', label: 'Terms of Use', href: "https://disneytermsofuse.com/" },
    { id: 'sitemap', label: 'Sitemap', href: '/sitemap' }
];


const basePlain=[
    {
        label:"DISNEY+, HULU BUNDLE BASIC",
        image: "./assets/dh.png",
        description: "Both with ads, for $10.99/month.",
        buttonText: "GET THEM BOTH"
    },
    {
        label:"Disney+, Hulu, HBO Max Bundle",
        image: "./assets/dhh.png",
        description: "Plans starting at $16.99/month.",
        buttonText: "LEARN MORE"
    }
];
