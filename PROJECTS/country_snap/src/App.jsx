import countriesData from "./data/countriesData";
import { FlagCard, SearchField, FilterDropdown, WebsiteLogo, Footer } from "./components/components";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [countriesList, setCountriesList] = useState([...countriesData]);

  function onSearch(value) {
    // Only search relevant fields for better performance
    const searchValue = value.toLowerCase();
    const list = countriesData.filter(
      (country) =>
        country.name?.common?.toLowerCase().includes(searchValue) ||
        country.name?.official?.toLowerCase().includes(searchValue) ||
        country.region?.toLowerCase().includes(searchValue) ||
        country.subregion?.toLowerCase().includes(searchValue) ||
        country.capital?.join(" ").toLowerCase().includes(searchValue)
    );
    setCountriesList(list.length ? list : [...countriesData]);
  }

  return (
    <div id="body">
      <nav className="nav-bar">
        <WebsiteLogo />
      </nav>

      <section id="filter-bar">
        <SearchField onChange={onSearch} />
        <FilterDropdown onFilterChange={onSearch} />
      </section>

      <section id="content-section">
        {countriesList.map((country, index) => (
          <FlagCard key={country.cca3 || index} country={country} />
        ))}
      </section>
      
      <Footer />
    </div>
  );
}
