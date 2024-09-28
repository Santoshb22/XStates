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

  const baseUrl = 'https://crio-location-selector.onrender.com/';

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${baseUrl}countries`);
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
        const res = await fetch(`${baseUrl}country=${selectedCountry}/states`);
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
          `${baseUrl}country=${selectedCountry}/state=${selectedState}/cities`
        );
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [selectedState]);

  return (
    <div className="xStates">
      <h1>Select Location</h1>
      <div className="dropDowns">
        <div className="countries">
            <DropDown data={countries} 
            onChange={(e) =>
               {setSelectedCountry(e.target.value) 
                setSelectedState('')
               setSelectedCity('')}}
         dropdownType="Country" />
        </div>

        <div className="states">
            <DropDown data={states} onChange={(e) => setSelectedState(e.target.value)} dropdownType="State" isDisabled={!selectedCountry}/>
        </div>

        <div className="cities">
            <DropDown data={cities} onChange={(e) => setSelectedCity(e.target.value)} dropdownType="City" isDisabled={!selectedState}/>
        </div>
      </div>

      {selectedCity && selectedCountry && selectedState && (
        <div className="showAddress">
          <p>
            You selected <span className="country">{selectedCountry}</span>,{' '} {selectedState}, {selectedCity}
          </p>
        </div>
      )}
    </div>
  );
};

export default XStates;
