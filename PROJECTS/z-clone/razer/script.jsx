const { useState } = React;

const promotedProductItems = [
  {
    image:
      "https://assets2.razerzone.com/images/pnx.assets/4bf1167fa2bc68f202dd7b488ae74f8f/razer-blade-14-desktop2x.webp",
    label: "Only at Razer",
    title: "NEW RAZER BLADE 14",
    subtitle: "THIN OUT THE COMPETITION",
    links: [
      {
        url: "/gaming-laptops/razer-blade-14",
        text: "Learn More",
      },
      {
        url: "/gaming-laptops/razer-blade-14/buy",
        text: "Buy",
      },
    ],
  },
  {
    image:
      "https://assets2.razerzone.com/images/pnx.assets/1b7cee0cd8423a8323f596cf6d5a5ef5/razer-collabs-zenless-zone-zero-teaser-homepage-desktop2x.webp",
    title: "RAZER | ZENLESS ZONE ZERO",
    subtitle: "CUT THROUGH THE CHAOS",
    links: [
      {
        url: "/collabs/zenless-zone-zero",
        text: "Learn More",
      },
    ],
  },
  {
    image:
      "https://assets2.razerzone.com/images/pnx.assets/1b7cee0cd8423a8323f596cf6d5a5ef5/razer-blackshark-v3-line-homepage-large-2x.webp",
    title: "RAZER BLACKSHARK V3 LINE",
    subtitle: "FOR THE PRO",
    links: [
      {
        url: "/pc/gaming-headsets-and-audio/blackshark-line",
        text: "Learn More",
      },
      {
        url: "/store/gaming-audio",
        text: "Buy",
      },
    ],
  },
  {
    image:
      "https://assets2.razerzone.com/images/pnx.assets/2cfc48feb59360dce56cd9c7f6f94d36/q325-backtoschool-b-950x580-desktop.webp",
    title: "MASTER YOUR MAJOR",
    subtitle: "GET MORE PERFORMANCE FOR LESS",
    links: [{ url: "#", text: "Shop Laptop Specials" }],
  },
  {
    image:
      "https://assets2.razerzone.com/images/pnx.assets/795a822cc568fe2c9d3cbb1c579a6d4e/razer-blade-16-2025-b-950x580-desktop.webp",
    label: "Only at Razer",
    title: "NEW RAZER BLADE 16",
    subtitle: "SLIMMER. SMARTER. SHARPER.",
    links: [
      { url: "/gaming-laptops/razer-blade-16", text: "Learn More" },
      { url: "/gaming-laptops/razer-blade-16/buy", text: "Buy" },
    ],
  },
  {
    image:
      "https://assets2.razerzone.com/images/pnx.assets/2cfc48feb59360dce56cd9c7f6f94d36/razer-core-x-v2-b-950x580-desktop.webp",
    title: "RAZER CORE X V2",
    subtitle: "MOBILITY MEETS DESKTOP PERFORMANCE",
    links: [
      { url: "/store/razer-core-x-v2", text: "Learn More" },
      { url: "/store/razer-core-x-v2/buy", text: "Buy" },
    ],
  },
  {
    image:
      "https://assets2.razerzone.com/images/pnx.assets/2cfc48feb59360dce56cd9c7f6f94d36/cobrahyperspeed-b-950x580-desktop.webp",
    title: "RAZER COBRA HYPERSPEED",
    subtitle: "PERFECTED FOR PLAY",
    links: [
      { url: "/gaming-mice/razer-cobra-hyperspeed", text: "Learn More" },
      { url: "/gaming-mice/razer-cobra-hyperspeed/buy", text: "Buy" },
    ],
  },
  {
    image:
      "https://assets2.razerzone.com/images/pnx.assets/2cfc48feb59360dce56cd9c7f6f94d36/razer-thunderbolt-5-dock-950x580-desktop.webp",
    title: "RAZER THUNDERBOLT™ 5 DOCK CHROMA",
    subtitle: "SPEED. STORAGE. SIMPLIFIED.",
    links: [
      { url: "/pc/accessories/thunderbolt-5-dock-chroma", text: "Learn More" },
      { url: "/pc/accessories/thunderbolt-5-dock-chroma/buy", text: "Buy" },
    ],
  },
  {
    image:
      "https://assets2.razerzone.com/images/pnx.assets/c2ec200913dfcee06a59099e2a8be875/razer-pokemon-b-950x580-desktop.webp",
    title: "RAZER | POKÉMON",
    subtitle: "CLASSIC PICKS. NEW ADVENTURES.",
    links: [
      { url: "/collabs/pokemon", text: "Learn More" },
      { url: "/store/pokemon", text: "Buy" },
    ],
  },
];

// Footer data
const FOOTER_SECTIONS = [
  {
    title: "Shop",
    links: [
      "RazerStores",
      "RazerCafe",
      "Store Locator",
      "Purchase Programs",
      "Bulk Order Program",
      "Education",
      "Only at Razer",
      "Razer Silver Rewards",
      "Affiliate",
    ],
  },
  {
    title: "Explore",
    links: ["Technology", "Chroma RGB", "Concepts", "Esports", "Collabs"],
  },
  {
    title: "Support",
    links: [
      "Get Help",
      "Registration & Warranty",
      "RazerStore Support",
      "RazerCare",
      "Manage Razer ID",
      "Support Videos",
      "Recycling Program",
      "Accessibility Statement",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Newsroom", "zVentures", "Contact Us"],
  },
];

// Data: navbar links
const NAV_ITEMS = [
  { label: "Store", href: "#" },
  { label: "PC", href: "#" },
  { label: "Console", href: "#" },
  { label: "Mobile", href: "#" },
  { label: "Furniture & Lifestyle", href: "#" },
  { label: "Gold & Silver", href: "#" },
  { label: "Community", href: "#" },
  { label: "Support", href: "#" },
];

// Notification bar component
function NotificationBar() {
  return (
    <div className="notif">
      <p>
        Back-to-school Specials: Explore curated gear loadouts specced for
        computer science, game design, and more. <a href="#">Shop Now &gt;</a>
      </p>
    </div>
  );
}

// Navbar component
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <img
          className="logo"
          src="https://assets2.razerzone.com/images/phoenix/razer-ths-logo.svg"
        />

        {NAV_ITEMS.map((item) => (
          <a
            className={`nav-links ${open ? "open" : ""}`}
            key={item.label}
            href={item.href}
          >
            {item.label}
          </a>
        ))}

        <button className="icon-btn" aria-label="Search">
          <i className="lni lni-search-1"></i>
        </button>
        <button className="icon-btn" aria-label="Cart">
          <i className="lni lni-cart-1"></i>
        </button>
      </nav>
      <div className="accent"></div>
    </header>
  );
}

function LargeImageSection({ list }) {
  return (
    <div className="products-section">
      {list.slice(0, 3).map((item, index) => (
        <div className="ps-card" key={index}>
          <img src={item.image} alt={item.title} />
          <div className="ps-content">
            {item.label && <p className="label">{item.label}</p>}
            <p className="title">{item.title}</p>
            <p className="subtitle">{item.subtitle}</p>
            <div className="links">
              {item.links.map((link, linkIndex) => (
                <a key={linkIndex} className="linkText" href={link.url}>
                  {link.text} <i className="lni lni-link-2-angular-right"></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="gridOf2">
        {list.slice(3).map((item, index) => (
          <div className="ps-card" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="ps-content">
              {item.label && <p className="label">{item.label}</p>}
              <p className="title">{item.title}</p>
              <p className="subtitle">{item.subtitle}</p>
              <div className="links">
                {item.links.map((link, linkIndex) => (
                  <a key={linkIndex} className="linkText" href={link.url}>
                    {link.text} <i className="lni lni-link-2-angular-right"></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <NotificationBar />
      <LargeImageSection list={promotedProductItems} />
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// Footer component (ul/li with hover behavior handled in CSS)
function Footer(){
  return (
    <footer className="site-footer">
      <div className="viewport">
        <div className="footer-grid">
          {FOOTER_SECTIONS.map((sec) => (
            <section key={sec.title} className="footer-section">
              <h4>{sec.title}</h4>
              <ul>
                {sec.links.map((label) => (
                  <li key={label}><a href="#">{label}</a></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </footer>
  );
}
