import React, {useState} from 'react';
import {Input, List} from 'antd';

const {Search} = Input;

interface SearchResult {
    key: string;
    name: string;
}

const SearchBarName: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearch = (value: string) => {
        setSearchValue(value);
        // Perform search logic or API call here
        console.log('Search value:', value);

        // Mock search results
        const results: SearchResult[] = data.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <div style={{maxWidth: '220px', marginLeft: 'auto'}}>
            <Search
                placeholder="Search for a name"
                enterButton="Search"
                size="middle"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onSearch={handleSearch}
            />
            {searchResults.length > 0 && (
                <List
                    style={{marginTop: '16px'}}
                    bordered
                    dataSource={searchResults}
                    renderItem={item => <List.Item>{item.name}</List.Item>}
                />
            )}
        </div>
    );
};

export default SearchBarName;

const data: SearchResult[] = [
    {
        key: '1',
        name: 'John Brown',
    },
    {
        key: '2',
        name: 'Jim Green',
    },
    {
        key: '3',
        name: 'Joe Black',
    },
    {
        key: '4',
        name: 'Jane Smith',
    },
];
