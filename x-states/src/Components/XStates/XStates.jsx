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
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setCountries([{name: 'Error fetching countries'}]);
      });
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setStates(data);
        setSelectedState('');
        setSelectedCity('');
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
      setStates([{ name: 'Error fetching states' }]);
      });
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) return;

    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setCities(data))
      .catch((error) => {
        console.error('Error fetching cities:', error);
        setCities([{name: 'Error fetching cities'}]);
      });
  }, [selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
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
