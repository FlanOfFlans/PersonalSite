<template>
    <DayCard
        :day="14"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
    <v-container>
        <v-row class="justify-center"> Part 2's solution checks for maximum robot density at the center of the grid. </v-row>
        <v-row class="justify-center"> This should work for all real-world inputs, but it is conceivable it may fail for some engineered inputs. </v-row>
    </v-container>
</template>
<script setup lang="ts">
import DayCard from "@c/AOC/DayCard.vue";
import { mod } from "@c/AOC/utils.ts";

type Robot = {
    x: number;
    y: number;
    velX: number;
    velY: number;
};

function solvePuzzle1(input: string): number {
    const robotStrings = input.trim().split("\n");

    let timeElapsed = 100;
    let width = 101;
    let height = 103;
    if (robotStrings.length < 30) {
        width = 11;
        height = 7;
    }

    const robots = robotStrings.map(r => parseRobotString(r));

    const middleCol = Math.floor(width / 2);
    const middleRow = Math.floor(height / 2);
    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;
    for(const robot of robots) {
        robot.x = mod(robot.x + robot.velX * timeElapsed, width);
        robot.y = mod(robot.y + robot.velY * timeElapsed, height);

        if (robot.x > middleCol && robot.y < middleRow) {
            q1 += 1;
        }

        else if (robot.x < middleCol && robot.y < middleRow) {
            q2 += 1;
        }

        else if (robot.x < middleCol && robot.y > middleRow) {
            q3 += 1;
        }

        else if (robot.x > middleCol && robot.y > middleRow) {
            q4 += 1;
        }
    }

    return q1 * q2 * q3 * q4;
}

function solvePuzzle2(input: string): number {
    const robotStrings = input.trim().split("\n");

    let width = 101;
    let height = 103;

    const robots = robotStrings.map(r => parseRobotString(r));

    const middleCol = Math.floor(width / 2);
    const middleRow = Math.floor(height / 2);

    const centerFraction = 0.5;

    const centerLeft = Math.floor(middleCol * centerFraction);
    const centerRight = Math.floor(middleCol * (1 + centerFraction));
    const centerTop = Math.floor(middleRow * centerFraction);
    const centerBottom = Math.floor(middleRow * (1 + centerFraction));

    let steps = 0;
    const densities: number[] = [];
    while (steps < width*height) {
        const centerRobots = robots.filter(r => r.x > centerLeft && r.x < centerRight && r.y > centerTop && r.y < centerBottom);
        densities[steps] = centerRobots.length / ((centerBottom - centerTop) * (centerRight - centerLeft));

        robots.map(r => stepRobot(r, width, height));
        steps += 1;
    }

    const maxDensity = densities.indexOf(Math.max(...densities));
    return maxDensity;
}

function parseRobotString(input: string): Robot {
    const re = /p=(?<x>-?\d+),(?<y>-?\d+) v=(?<velX>-?\d+),(?<velY>-?\d+)/

    const result = re.exec(input)?.groups;

    if (result == undefined) {
        throw new Error(`Bad robot string ${input}`);
    }

    return { x: parseInt(result.x), y: parseInt(result.y), velX: parseInt(result.velX), velY: parseInt(result.velY) }
}

function stepRobot(robot: Robot, width: number, height: number) {
    robot.x = mod(robot.x + robot.velX, width);
    robot.y = mod(robot.y + robot.velY, height);
}

const testInput = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;
</script>