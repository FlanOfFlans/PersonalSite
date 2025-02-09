<template>
    <DayCard
        :day="12"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "../DayCard.vue";
import { Coord, getAdjacentCells } from "@/utils";

type PlotNode = {
    type: string;
    edges: number | undefined;
    corners: number | undefined;
    visited: boolean;
    connections: PlotNode[]
};

function solvePuzzle1(input: string): number {
    const grid = input.trim().split("\n").map(line => 
        line.split("").map(plot =>
            ({
                type: plot,
                edges: undefined,
                visited: false
            })
    )) as PlotNode[][];

    const plotRoots: PlotNode[] = [];

    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[0].length; x++) {
            const plot = grid[y][x];
            if (!plot.visited) {
                plotRoots.push(plot);
                connectPlot(grid, {x, y});
            }
        }
    }

    let price = 0;
    for(let root of plotRoots) {
        const result = measurePlot(root);
        price += result.area * result.perimeter;
    }

    return price;
}

function solvePuzzle2(input: string): number {
    const grid = input.trim().split("\n").map(line => 
        line.split("").map(plot =>
            ({
                type: plot,
                edges: undefined,
                visited: false
            })
    )) as PlotNode[][];

    const plotRoots: PlotNode[] = [];

    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[0].length; x++) {
            const plot = grid[y][x];
            if (!plot.visited) {
                plotRoots.push(plot);
                connectPlot(grid, {x, y});
            }
        }
    }

    let price = 0;
    for(let root of plotRoots) {
        const result = measurePlot(root);
        price += result.area * result.corners;
    }

    return price;
}

function connectPlot(grid: PlotNode[][], coord: Coord) {
    const plot = grid[coord.y][coord.x];
    const adjacentPlots = getAdjacentCells(grid, coord);
    const likePlots = adjacentPlots.filter(p => p.value.type == plot.type);
    plot.edges = 4 - likePlots.length;
    plot.visited = true;
    plot.connections = likePlots.map(p => p.value);

    plot.corners = 0;
    const left = grid[coord.y]?.[coord.x - 1];
    const right = grid[coord.y]?.[coord.x + 1];
    const up = grid[coord.y - 1]?.[coord.x];
    const down = grid[coord.y + 1]?.[coord.x];
    const upleft = grid[coord.y - 1]?.[coord.x - 1];
    const upright = grid[coord.y - 1]?.[coord.x + 1];
    const downleft = grid[coord.y + 1]?.[coord.x - 1];
    const downright = grid[coord.y + 1]?.[coord.x + 1];

    if (left?.type != plot.type && up?.type != plot.type) {
        plot.corners += 1;
    }

    else if(left?.type == plot.type && up?.type == plot.type && upleft?.type != plot.type) {
        plot.corners += 1;
    }

    if (right?.type != plot.type && up?.type != plot.type) {
        plot.corners += 1;
    }

    else if(right?.type == plot.type && up?.type == plot.type && upright?.type != plot.type) {
        plot.corners += 1;
    }

    if (left?.type != plot.type && down?.type != plot.type) {
        plot.corners += 1;
    }

    else if(left?.type == plot.type && down?.type == plot.type && downleft?.type != plot.type) {
        plot.corners += 1;
    }

    if (right?.type != plot.type && down?.type != plot.type) {
        plot.corners += 1;
    }

    else if(right?.type == plot.type && down?.type == plot.type && downright?.type != plot.type) {
        plot.corners += 1;
    }

    likePlots.filter(p => !p.value.visited).map(p => connectPlot(grid, p.coord));
}

function measurePlot(root: PlotNode): {area: number, perimeter: number, corners: number} {
    const initialHistory: PlotNode[] = [];

    function recurse(node: PlotNode, history: PlotNode[]): {area: number, perimeter: number, corners: number} {
        if (history.includes(node)) { return {area: 0, perimeter: 0, corners: 0}; }
        
        history.push(node);
        const unvisitedNodes = node.connections.filter(n => !history.includes(n));
        let area = 0;
        let perimeter = 0;
        let corners = 0;
        for (let unvisitedNode of unvisitedNodes) {
            const result = recurse(unvisitedNode, history);
            area += result.area;
            perimeter += result.perimeter;
            corners += result.corners;
        }

        area += 1;
        perimeter += node.edges ?? 0;
        corners += node.corners ?? 0;
        return {area, perimeter, corners};
    }

    return recurse(root, initialHistory);
}

const testInput = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;
</script>