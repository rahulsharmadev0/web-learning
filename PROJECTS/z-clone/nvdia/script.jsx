// Reusable hook for horizontal carousels with range control
function useHorizontalScroll() {
  const sliderRef = React.useRef(null);
  const [rangeMax, setRangeMax] = React.useState(0);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const measure = () => {
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      setRangeMax(max);
      setValue((v) => Math.min(v, max));
    };

    const onScroll = () => {
      setValue(el.scrollLeft);
    };

    measure();
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener("resize", measure);
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onRangeInput = (e) => {
    const x = Number(e.target.value);
    setValue(x);
    const el = sliderRef.current;
    if (el) el.scrollTo({ left: x, behavior: "auto" });
  };

  const scrollByDelta = (dx) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  const scrollByPage = (dir = 1) => {
    const el = sliderRef.current;
    if (!el) return;
    const delta = Math.max(320, Math.floor(el.clientWidth * 0.9)) * dir;
    scrollByDelta(delta);
  };

  return { sliderRef, rangeMax, value, onRangeInput, scrollByPage };
}

function RecommendationSection({ list }) {
  const { sliderRef, rangeMax, value, onRangeInput, scrollByPage } =
    useHorizontalScroll();

  return (
    <div className="recommendation-section">
      <div className="viewport-limit rs-header">
        <h2>Recommended For You</h2>
        <div className="rs-actions">
          <img className="icon" src="./assets/settings-icon.svg" alt="settings" />
          <button
            type="button"
            className="icon-btn"
            aria-label="Previous"
            onClick={() => scrollByPage(-1)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label="Next"
            onClick={() => scrollByPage(1)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div ref={sliderRef} className="carousel-slider">
        {list.map((item, idx) => (
          <a className="rs-card" key={idx} href={item.url}>
            <img src={item.imageUrl} alt={item.title} />
            <div className="rs-card-content">
              <p className="rs-pretitle">{item.pretitle}</p>
              <p className="rs-title">{item.title}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="viewport-limit">
        <div className="carousel-controls">
          <input
            className="range"
            type="range"
            min="0"
            max={rangeMax}
            value={Math.min(value, rangeMax)}
            step="1"
            onInput={onRangeInput}
            onChange={onRangeInput}
            aria-label="Recommended scroll"
          />
        </div>
      </div>
    </div>
  );
}

function HeaderBanner({ list }) {
  const [currentCard, setCurrentCard] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % list.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [list.length]);

  const info = list[currentCard];
  return (
    <div className="header-banner" style={{backgroundColor: info.color}}>
      <div className="viewport-limit">
        <img className="hb-image" src={info.image} alt={info.title} />
        <div className="hb-content">
          {info.label && <p className="hb-label">{info.label}</p>}
          <p className="hb-title">{info.title}</p>
          {info.subtitle && <p className="hb-label">{info.subtitle}</p>}
          <p className="hb-description">{info.description}</p>
          <a className="btn" href="#">
            {info.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="nav-bar">
      <div>
        <span className="logo"></span>
        <span>Products</span>
        <span>Solutions</span>
        <span>Industries</span>
      </div>

      <div>
        <span>Shop</span>
        <span>Drivers</span>
        <span>Support</span>
        <img className="icon" src="./assets/search-icon.svg"></img>
        <img className="icon" src="./assets/globe-icon.svg"></img>
        <img className="icon" src="./assets/profile-icon.svg"></img>
      </div>
    </nav>
  );
}

function BlogCard({ info }) {
  const imgUrl = info.imageUrl;
  const imageAlt = info.imageAlt;
  const title = info.title;
  const label = `${info.category} | ${info.type}`;
  const description = info.description;
  return (
    <div className="blog-card">
      <img src={imgUrl} alt={imageAlt} />
      <div className="info">
        <p className="label">{label}</p>
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}

function BlogSectionFirstCard({ info }) {
  const [isDown, setDown] = React.useState(false);
  const icon = isDown ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down";

  const handleToggle = () => setDown((prev) => !prev);

  return (
    <div className="blog-section-first-card">
      <p className="description">{info.description}</p>
      <p
        className="quick-links"
        onClick={handleToggle}
        style={{ cursor: "pointer" }}
      >
        <i className={icon}></i> Quick Links
      </p>
      {isDown && (
        <div className="quick-links-list">
          {info.links.map((item, idx) => (
            <a href={item.url} key={idx}>
              {item.label} <i className="fa-solid fa-angle-right"></i>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogsSection({ list }) {
  const { sliderRef, rangeMax, value, onRangeInput } = useHorizontalScroll();
  return (
    <div className="blogs-section">
      <h2 className="viewport-limit">{list[0].title}</h2>
      <div ref={sliderRef} className="carousel-slider">
        {list.map((item, idx) =>
          idx == 0 ? (
            <BlogSectionFirstCard info={item} key={idx} />
          ) : (
            <BlogCard info={item} key={idx} />
          )
        )}
      </div>
      <div className="viewport-limit">
        <div className="carousel-controls">
          <input
            className="range"
            type="range"
            min="0"
            max={rangeMax}
            value={Math.min(value, rangeMax)}
            step="1"
            onInput={onRangeInput}
            onChange={onRangeInput}
            aria-label="Carousel scroll"
          />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const createUl = (list) => (
    <ul>
      {list.map((link, index) => (
        <li key={index}>
          <a href={link.url}>{link.name}</a>
        </li>
      ))}
    </ul>
  );
  return (
    <footer className="footer">
      <div className="viewport-limit">
        <div className="footer-links">
          <div className="link-column">
            <h3>Company Information</h3>
            {createUl(FooterData.companyInfo)}
          </div>

          <div className="link-column">
            <h3>News and Events</h3>
            {createUl(FooterData.newsEvents)}
          </div>

          <div className="link-column">
            <h3>Popular Links</h3>
            {createUl(FooterData.popularLinks)}
          </div>
        </div>
        <div className="footer-social">
          <span>Follow NVIDIA</span>
          {FooterData.socialLinks.map((social, index) => (
            <a key={index} href={social.url}>
              <i className={`fa-brands ${social.icon}`}></i>
            </a>
          ))}
        </div>
      </div>

      <div className="global-footer">
        <div className="viewport-limit">
          <div className="footer-brand-logo"></div>
          <ul className="global-footer_links">
            {FooterData.legalLinks.map((link, index) => (
              <li key={index}>
                <span>{link.name}</span>
              </li>
            ))}
          </ul>

          <p className="global-footer_copyright">
            Made with ❤️ by @rahulsharmadev
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <NavBar />
      <HeaderBanner list={BannerData} />
      <RecommendationSection list={RecommendationData} />
      <BlogsSection list={AiData} />
      <BlogsSection list={DesignSimulationData} />
      <BlogsSection list={HPCData} />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
