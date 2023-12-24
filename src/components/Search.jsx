import React, { useState } from 'react';
import SearchIcon from '../assets/search.svg';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // Pass the search term back to the parent component
  };

  return (
    <div className='flex gap-4 p-4'>
      <img className='w-6' src={SearchIcon} alt='search' />
      <input
        className='bg-[#1d2327] border-0 focus:outline-none'
        type='text'
        placeholder='Search notes...'
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
