import { useEffect, useState } from 'react';
import DropDown from '../DropDown/DropDown';
import './XStates.css';

const XStates = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const BASE_URL = 'https://crio-location-selector.onrender.com';

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/countries`);
        const data = await res.json();
        setCountries(data);
        
      } catch (e) {
          console.error('An error occurred while fetching countries');
          setCountries([]);
      }
    }

    fetchCountries();
  }, [])

  useEffect(() => {
    if (!selectedCountry) return;

      const fetchStates = async (country) => {
        try {
            const res = await fetch(`${BASE_URL}/country=${country}/states`);
            const data = await res.json();
            setStates(data);
        } catch (e) {
            console.error('An error occurred while fetching states');
            setSelectedState([]);
        }
    }

    fetchStates(selectedCountry);

  }, [selectedCountry])

  useEffect(() => {
    if (!selectedState) return;

    const fetchCities = async (country, state) => {
      try {
          const res = await fetch(`${BASE_URL}/country=${country}/state=${state}/cities`);
          const data = await res.json();
          setCities(data);
      } catch (e) {
          console.error('An error occurred while fetching cities');
          setCities([]);
      }
  }
  fetchCities(selectedCountry, selectedState);
  }, [selectedState])

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity("");
    setSelectedState("");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setStates([]);
    setCities([]);
  };

  return (
    <div className="xStates">
      <h1>Select Location</h1>
      <div className="dropDowns">
        <div className="countries">
          <DropDown data={countries} onChange={handleCountryChange} dropdownType="Country" />
        </div>

        <div className="states">
          <DropDown data={states} onChange={handleStateChange} dropdownType="State" isDisabled={!selectedCountry} />
        </div>

        <div className="cities">
          <DropDown data={cities} onChange={handleCityChange} dropdownType="City" isDisabled={!selectedState} />
        </div>
      </div>

      {selectedCity && selectedCountry && selectedState && (
        <div className="showAddress">
          {selectedCity && (
            <h3>
              You selected <span className='country'>{selectedCity}</span>,
              <span className='cityState'> {selectedState}, {selectedCountry}</span>
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default XStates;
