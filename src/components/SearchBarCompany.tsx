import React, {useState} from 'react';
import {Input} from 'antd';

const {Search} = Input;

const SearchBarCompany: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        setSearchValue(value);
        // Perform search logic or API call here
        console.log('Search value:', value);
    };

    return (
        <div style={{marginLeft: '20px', maxWidth: '250px', marginRight: 'auto', display: 'flex', alignItems: 'center'}}>
            <Search
                placeholder="Search for a company"
                enterButton="Search"
                size="middle"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={handleSearch}
            />
        </div>
    );
};

export default SearchBarCompany;
