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
        setCountries([{ name: 'Error fetching countries' }]);
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
        if (!res.ok) throw new Error('Network response was not ok');
        setSelectedState(''); 
        setSelectedCity(''); 
      } catch (error) {
        console.error('Error fetching states:', error);
        setStates([{ name: 'Error fetching states' }]);
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
        if (!res.ok) throw new Error('Network response was not ok');
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([{ name: 'Error fetching cities' }]);
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
          You selected <span>{selectedCity}</span>,{' '}
          <span>{selectedState}</span>,{' '}
          <span>{selectedCountry}</span>
        </p>
        </div>
      )}
    </div>
  );
};

export default XStates;
