import './App.css';
import Card from './Card';
import React, { useState, useEffect, useRef } from 'react';
import DownArrow from './assets/arrow-down.svg';
import FilterIcon from './assets/filter2.svg';

function App() {
  const [groupingOption, setGroupingOption] = useState('name'); // Default grouping option
  const [orderingOption, setOrderingOption] = useState('title'); // Default ordering option
  const savedGroupingOption = localStorage.getItem('groupingOption');
  const savedOrderingOption = localStorage.getItem('orderingOption');

  useEffect(() => {

    if (savedGroupingOption) {
      setGroupingOption(savedGroupingOption);
    }
    if (savedOrderingOption) {
      setOrderingOption(savedOrderingOption);
    }
    // console.log('Loaded groupingOption:', savedGroupingOption);
    // console.log('Loaded orderingOption:', savedOrderingOption);
  }, [setGroupingOption, setOrderingOption]);

  useEffect(() => {
    // console.log('saved groupingOption:', savedGroupingOption);
    // console.log('saved orderingOption:', savedOrderingOption);
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('orderingOption', orderingOption);
  }, [groupingOption, orderingOption]);



  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">

      <div className="dropdown" >
        <div className="display-container" ref={dropdownRef}>
          <div className="display-header" onClick={toggleDropdown}>
            <img src={FilterIcon} width={16} height={16} style={{ paddingRight: '0.5rem', paddingTop: '0.1rem' }} />
            <span>Display</span>
            <img src={DownArrow} width={16} height={16} style={{ paddingLeft: '0.5rem' }} />
          </div>
          {isDropdownVisible && (
            <div className="display-content">
              <div className="sub-dropdown">
                <label htmlFor="groupingOption" className='select-title' >Grouping</label>
                <select
                  className='select-menu'
                  id="groupingOption"
                  onChange={(e) => setGroupingOption(e.target.value)}
                  value={groupingOption}
                >
                  <option value="name">Name</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                </select>
              </div>
              <div className="sub-dropdown">
                <label htmlFor="orderingOption" className='select-title'>Ordering</label>
                <select
                  className='select-menu'
                  id="orderingOption"
                  onChange={(e) => setOrderingOption(e.target.value)}
                  value={orderingOption}
                >
                  <option value="title">Title</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="main">
        <Card
          groupingOption={groupingOption}
          orderingOption={orderingOption}
        />
      </div>
    </div>
  );
}

export default App;
