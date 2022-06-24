import React, { useState, useEffect } from "react";
import { Cards, Charts, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import covidTrackerImg from "./images/covid-tracker.png";

export default function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    getData();
  }, []);

  const handleCountryChange = async (country) => {
    console.log(country);
    const getCountryData = async () => {
      const fetchedCountryData = await fetchData(country);
      setData(fetchedCountryData);
      setCountry(country);
    };
    getCountryData();
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={covidTrackerImg} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Charts data={data} country={country} />
    </div>
  );
}
