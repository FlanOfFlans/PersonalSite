<template>
    <DayCard
        :day="10"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "../DayCard.vue";

type PositionNode = {
    value: number;
    connections: PositionNode[];
};

function solvePuzzle1(input: string): number {
    let trimmedInput = input.trim();
    const nodes = trimmedInput.split("\n")
        .map(line =>
            line.split("").map(n =>
                ({ value: parseInt(n), connections: [] } as PositionNode)
    ));

    connectNodes(nodes);

    const zeroes = nodes.flatMap(line => line.filter(node => node.value == 0))
    const scores = zeroes.map(zero => findUniquePeaks(zero).length);
    const totalScore = scores.reduce((partialSum, n) => partialSum + n);
    
    return totalScore;
}

function solvePuzzle2(input: string): number {
    let trimmedInput = input.trim();
    const nodes = trimmedInput.split("\n")
        .map(line =>
            line.split("").map(n =>
                ({ value: parseInt(n), connections: [] } as PositionNode)
    ));

    connectNodes(nodes);

    const zeroes = nodes.flatMap(line => line.filter(node => node.value == 0))
    const scores = zeroes.map(zero => findPeakPaths(zero));
    const totalScore = scores.reduce((partialSum, n) => partialSum + n);
    
    return totalScore;
}

function connectNodes(grid: PositionNode[][]): void {
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[0].length; x++) {
            const node = grid[y][x];
            
            let adjacentNodes: PositionNode[] = [];
            if ( y > 0 ) {
                adjacentNodes.push(grid[y - 1][x]);
            }
            if ( y < grid.length - 1) {
                adjacentNodes.push(grid[y + 1][x]);
            }
            if ( x > 0) {
                adjacentNodes.push(grid[y][x - 1]);
            }
            if (x < grid[0].length - 1) {
                adjacentNodes.push(grid[y][x + 1]);
            }

            const connections = adjacentNodes.filter(n => n.value == node.value + 1)
            node.connections = connections;
        }
    }
}
 
function findUniquePeaks(start: PositionNode): PositionNode[] {
    if (start.value == 9) { return [start]; }
    
    let peaks = new Set<PositionNode>;
    for (let connection of start.connections) {
        let connectedPeaks = findUniquePeaks(connection);
        connectedPeaks.forEach(p => peaks.add(p));
    }

    return Array.from(peaks);
}

function findPeakPaths(start: PositionNode): number {
    if (start.value == 9) { return 1; }
    
    let paths = 0;
    for (let connection of start.connections) {
        let connectedPaths = findPeakPaths(connection);
        paths += connectedPaths;
    }

    return paths;
}

const testInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
</script>
