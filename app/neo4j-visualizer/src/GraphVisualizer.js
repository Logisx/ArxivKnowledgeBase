// src/GraphVisualizer.js
import React from 'react';
import { Graph } from 'react-d3-graph';

function GraphVisualizer({ data }) {
    const config = {
        nodeHighlightBehavior: true,
        node: { color: 'lightblue', size: 120 },
        link: { highlightColor: 'lightblue' }
    };

    return (
        <Graph
            id="graph-id"
            data={data}
            config={config}
        />
    );
}

export default GraphVisualizer;
