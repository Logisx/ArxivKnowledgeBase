// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import GraphVisualizer from './GraphVisualizer';
import './App.css';

function App() {
    const [data, setData] = useState({ nodes: [], links: [] });

    const handleSearch = async (query) => {
        try {
            const response = await axios.get('http://localhost:3000/papers', { params: { query } });
            const results = response.data;
            const nodes = [];
            const links = [];

            results.forEach(paper => {
                nodes.push({ id: paper.paper.title, label: 'Paper' });
                if (paper.author) {
                    nodes.push({ id: `${paper.author.first_name} ${paper.author.last_name}`, label: 'Author' });
                    links.push({ source: paper.paper.title, target: `${paper.author.first_name} ${paper.author.last_name}` });
                }
                if (paper.category) {
                    nodes.push({ id: paper.category.category, label: 'Category' });
                    links.push({ source: paper.paper.title, target: paper.category.category });
                }
                if (paper.topic) {
                    nodes.push({ id: paper.topic.topic_representation, label: 'Topic' });
                    links.push({ source: paper.paper.title, target: paper.topic.topic_representation });
                }
            });

            setData({ nodes, links });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="App">
            <h1>Neo4j Knowledge Graph</h1>
            <SearchBar onSearch={handleSearch} />
            <GraphVisualizer data={data} />
        </div>
    );
}

export default App;




/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/