const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

const app = express();
const port = 3001;  // Changed port to avoid conflict with React dev server

app.use(cors());  // Enable CORS for all routes

// Initialize Neo4j driver
const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('username', 'password'));
const session = driver.session();

// Endpoint to fetch papers
app.get('/papers', async (req, res) => {
    const { query } = req.query;

    // Example Cypher query
    const cypherQuery = `
        MATCH (p:Paper)
        OPTIONAL MATCH (p)-[:AUTHORED_BY]->(a:Author)
        OPTIONAL MATCH (p)-[:BELONGS_TO]->(c:Category)
        OPTIONAL MATCH (p)-[:HAS_TOPIC]->(t:Topic)
        RETURN p, a, c, t
        LIMIT 100
    `;

    try {
        const result = await session.run(cypherQuery);
        const papers = result.records.map(record => ({
            paper: record.get('p').properties,
            author: record.get('a') ? record.get('a').properties : null,
            category: record.get('c') ? record.get('c').properties : null,
            topic: record.get('t') ? record.get('t').properties : null
        }));
        res.json(papers);
    } catch (error) {
        console.error('Error fetching data from Neo4j:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Close the Neo4j driver when the process exits
process.on('exit', () => {
    session.close();
    driver.close();
});
