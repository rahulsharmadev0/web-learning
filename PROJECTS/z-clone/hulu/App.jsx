/*------------------------Components-------------------------------*/

function MovieCard({ category }) {
  return (
    <div className="movie-card">
      <img src={category.image} alt={category.alt} />
      <div className="info-container">
        <p className="subtitle">{category.subtitle}</p>
        <p className="title">{category.title}</p>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="logo"></div>
      <a href="#">LOG IN</a>
    </nav>
  );
}

function MSPlanContainer({ plain }) {
  return (
    <div className="ms-plan-container">
      <p className="live-tv-badge sTxt">{plain.label}</p>
      <img src={plain.image} alt={plain.label} />
      <h2>{plain.description}</h2>
      <button className="btn">{plain.buttonText}</button>
      <a className="btn-secondary sTxt" href="#">
        Terms apply
      </a>
    </div>
  );
}

/*------------------------Section-------------------------------*/

function MainSection() {
  return (
    <React.Fragment>
      <div className="main-section">
        {basePlain.map((plain, idx) => (
          <MSPlanContainer plain={plain} key={idx} />
        ))}
      </div>

      <div className="banner">
        <div className="banner-info">
          <img src="./assets/dhe.png" />
          <div className="banner-content">
            <p className="live-tv-badge sTxt">
              DISNEY+, HULU, ESPN+ BUNDLE BASIC
            </p>
            <p className="banner-title">
              Get Hulu, Disney+, and ESPN+, all with ads, for $16.99/mo.
            </p>
            <a className="btn-secondary sTxt" href="#">
              What's Included?
            </a>
          </div>
        </div>

        <div className="banner-actions">
          <div className="btn">GET ALL THREE</div>
          <a className="btn-secondary sTxt" href="#">
            Terms apply
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

function MovieShowCaseSection() {
  return (
    <div className="section viewport">
      <p className="live-tv-badge">INCLUDED IN ALL PLANS</p>
      <h2 className="live-tv-title">All The TV You Love</h2>
      <p className="live-tv-description">
        Watch full seasons of exclusive streaming series, current-season
        episodes, hit movies, Hulu Originals, kids shows, and more.
      </p>
      <div className="content-grid">
        {contentCategories.map((category, idx) => (
          <MovieCard key={idx} category={category} />
        ))}
      </div>
    </div>
  );
}

function LiveTVSection() {
  return (
    <React.Fragment>
      <div className="section viewport">
        <div className="live-tv-badge">{liveTVContent.badge}</div>
        <h2 className="live-tv-title">{liveTVContent.title}</h2>
        <p className="live-tv-description">{liveTVContent.description}</p>
        <a className="btn nTxt" style={{ margin: "20px 0"}} href={liveTVContent.primaryButton.href}>
          {liveTVContent.primaryButton.text}
        </a>

        <p className="live-tv-disclaimer">
          {liveTVContent.disclaimer}
          <a href="#"> See detatils.</a>
        </p>
        <a className="btn-secondary" href="#">
          {liveTVContent.channelsButtonText}
        </a>
      </div>
      <div id="live-sports-container"></div>
    </React.Fragment>
  );
}

// Pricing Section
function PricingSection() {}

// Footer Component
function Footer() {}

// Main App Component
function App() {
  return (
    <div>
      <Navbar />
      <MainSection />
      <MovieShowCaseSection />
      <LiveTVSection />
      {/* <FeaturesSection />
            <PricingSection />
            <Footer /> */}
    </div>
  );
}

// Render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
