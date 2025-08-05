import React, { useState } from "react";
import "../components/components.css";
import FlipCard from "./flip-card/flip-card";
import downIcon from "../data/down.svg";
import upIcon from "../data/up.svg";

function FlagCard({ country }) {
  const [isFlipped, setFlip] = useState(false);
  // Helper variables to safely extract data
  const countryName = country?.name?.common || "Unknown";
  const officialName = country?.name?.official || "";
  const flagUrl = country?.flags?.png || country?.flags?.svg || "";
  const population = country?.population
    ? country.population.toLocaleString()
    : "N/A";
  const region = country?.region || "N/A";
  const subregion = country?.subregion || "";
  const capital = country?.capital?.[0] || "N/A";
  const area = country?.area ? `${country.area.toLocaleString()} km²` : "N/A";
  const currency = (() => {
    const currencies = country?.currencies;
    if (!currencies) return "N/A";
    const firstCurrency = Object.values(currencies)[0];
    return firstCurrency
      ? `${firstCurrency.symbol || ""} ${firstCurrency.name}`
      : "N/A";
  })();
  const languages = (() => {
    const langs = country?.languages;
    if (!langs) return [];
    return Object.values(langs);
  })();
  const phoneCode = (() => {
    const idd = country?.idd;
    if (!idd) return "N/A";
    return `${idd.root}${idd.suffixes?.[0] || ""}`;
  })();
  const coordinates = (() => {
    const latlng = country?.latlng;
    if (!latlng || latlng.length < 2) return "N/A";
    return `${latlng[0]}°, ${latlng[1]}°`;
  })();
  const timezone = country?.timezones?.[0] || "N/A";
  const borders = (() => {
    const b = country?.borders;
    if (!b || b.length === 0) return "None";
    return b.map((border) => `${border}`).join(", ");
  })();
  const drivingSide = country?.car?.side === "left" ? "🚗 Left" : "🚗 Right";
  const nativeNames = (() => {
    const native = country?.name?.nativeName;
    if (!native) return [];
    return Object.values(native)
      .slice(0, 2)
      .map((name) => name.official || name.common);
  })();

  return (
    <FlipCard isFlipped={isFlipped}>
      <div className="flagCardFront" onDoubleClick={() => setFlip(!isFlipped)}>
        <img src={flagUrl} alt={`Flag of ${countryName}`} />
        <div className="content">
          <div>
            <h2>{countryName}</h2>
            <h3>({officialName})</h3>
          </div>
          <div className="info">
            <p>
              <span>Population</span> {population}
            </p>
            <p>
              <span>Region</span> {region} {subregion && `(${subregion})`}
            </p>
            <p>
              <span>Capital</span> {capital}
            </p>
          </div>
        </div>
      </div>

      <div className="flagCardBack" onDoubleClick={() => setFlip(!isFlipped)}>
        <h3>{country?.flag || "�️"} Additional Details</h3>

        <div className="section">
          <div className="section-title">Official Info</div>
          <div className="detail-item">
            <span>ISO Code:</span>
            <span>
              {country?.cca3 || "N/A"} ({country?.ccn3 || "N/A"})
            </span>
          </div>
          <div className="detail-item">
            <span>Domain:</span>
            <span>{country?.tld?.[0] || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span>Phone Code:</span>
            <span>{phoneCode}</span>
          </div>
          <div className="detail-item">
            <span>UN Member:</span>
            <span>{country?.unMember ? "✅ Yes" : "❌ No"}</span>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Economy & Geography</div>
          <div className="detail-item">
            <span>Currency:</span>
            <span>{currency}</span>
          </div>
          <div className="detail-item">
            <span>Area:</span>
            <span>{area}</span>
          </div>
          <div className="detail-item">
            <span>Coordinates:</span>
            <span>{coordinates}</span>
          </div>
          <div className="detail-item">
            <span>Timezone:</span>
            <span>{timezone}</span>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Languages</div>
          <div className="languages">
            {languages.map((lang, index) => (
              <span key={index} className="language-tag">
                {lang}
              </span>
            ))}
          </div>
          <div className="native-names">
            {nativeNames.map((name, index) => (
              <div key={index}>
                {country?.flag || "�️"} {name}
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-title">Geography & Neighbors</div>
          <div className="detail-item">
            <span>Borders:</span>
            <span>{borders}</span>
          </div>
          <div className="detail-item">
            <span>Driving Side:</span>
            <span>{drivingSide}</span>
          </div>
          <div className="detail-item">
            <span>Landlocked:</span>
            <span>{country?.landlocked ? "🏔️ Yes" : "🌊 No"}</span>
          </div>
        </div>

        {country?.maps && (
          <div className="section">
            <div className="section-title">External Links</div>
            <div className="links">
              {country.maps.googleMaps && (
                <a
                  href={country.maps.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 Google Maps
                </a>
              )}
              {country.maps.openStreetMaps && (
                <a
                  href={country.maps.openStreetMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🗺️ OpenStreetMap
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </FlipCard>
  );
}

// Search Field

function SearchField({ onChange }) {
  return (
    <input
      className="search-field"
      type="text"
      placeholder="Search for a country..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const regions = [
  "All Regions",
  "Africa",
  "Asia",
  "Americas",
  "Europe",
  "Oceania",
];
function FilterDropdown({ onFilterChange }) {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const dropdownRef = React.useRef(null);

  const toggleDropdown = () => setIsFilterDropdownOpen((open) => !open);
  const handleFilterSelect = (index) => {
    setSelectedIndex(index);

    if (onFilterChange) {
      onFilterChange(index === 0 ? "" : regions[index]);
    }
    setIsFilterDropdownOpen(false);
  };

  React.useEffect(() => {
    if (!isFilterDropdownOpen) return;

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterDropdownOpen]);

  return (
    <div className="filterDropdown" ref={dropdownRef}>
      <button className="filterDropdownButton" onClick={toggleDropdown}>
        {selectedIndex !== -1 ? regions[selectedIndex] : "Filter by Region"}
        <img
          className="icon"
          src={isFilterDropdownOpen ? upIcon : downIcon}
          alt={isFilterDropdownOpen ? "Up" : "Down"}
        />
      </button>
      {isFilterDropdownOpen && (
        <ul className="filterDropdownOptions">
          {regions.map((value, index) => (
            <li key={value} onClick={() => handleFilterSelect(index)}>
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Website Logo Component
function WebsiteLogo() {
  return (
    <div className="website-logo">
      <span className="logo-icon">🌍</span>
      <h1 className="logo-text">CountrySnap</h1>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <div className="footer-license">
      <p>Made with ❤️ by  <a className="author" href="https://github.com/rahulsharmadev0">@rahulsharmadev</a></p>
      <p>All rights reserved. Licensed under the MIT License.</p>
    </div>
  );
}

export { SearchField, FlagCard, FilterDropdown, WebsiteLogo, Footer };
