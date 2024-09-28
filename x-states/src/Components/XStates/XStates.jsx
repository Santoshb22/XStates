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


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://crio-location-selector.onrender.com/countries');
        const data = await res.json();
        if (!res.ok) throw new Error('Network response was not ok');
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchStates = async () => {
      try {
        const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        const data = await res.json();
        setStates(data);
        setSelectedState(''); 
        setSelectedCity(''); 
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) return;

    const fetchCities = async () => {
      try {
        const res = await fetch(
         `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [selectedState]);


  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  }

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setStates([]);
    setCities([]);
  }

  return (
    <div className="xStates">
      <h1>Select Location</h1>
      <div className="dropDowns">
        <div className="countries">
            <DropDown data={countries} 
            onChange={handleCountryChange}
            dropdownType="Country" />
        </div>

        <div className="states">
            <DropDown data={states} 
            onChange={handleStateChange} 
             dropdownType="State" isDisabled={!selectedCountry}/>
        </div>

        <div className="cities">
            <DropDown data={cities} onChange={handleCityChange} dropdownType="City" isDisabled={!selectedState}/>
        </div>
      </div>

      {selectedCity && selectedCountry && selectedState && (
        <div className="showAddress">
          <p>
            You selected <span className="country">{selectedCountry}</span>,{' '}
            <span className="cityState">
              {selectedState}, {selectedCity}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default XStates;
