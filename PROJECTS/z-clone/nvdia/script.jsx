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
  return (
    <div className="blogs-section viewport-limit">
      <h2>{list[0].title}</h2>
      <div className="carousel-slider">
        {list.map((item, idx) =>
          idx == 0 ? (
            <BlogSectionFirstCard info={item} key={idx} />
          ) : (
            <BlogCard info={item} key={idx} />
          )
        )}
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
      <BlogsSection list={AiData} />
      <BlogsSection list={DesignSimulationData} />
      <BlogsSection list={HPCData} />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
