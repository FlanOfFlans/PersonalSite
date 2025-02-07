<template>
    <DayCard
        :day="9"
        :test-input="testInput"
        :puzzle-solution-1="solvePuzzle1"
        :puzzle-solution-2="solvePuzzle2"
    />
</template>
<script setup lang="ts">
import DayCard from "../DayCard.vue";

function solvePuzzle1(input: string): number {
    let drive = hydrateInput(input);

    let firstFreeIndex = drive.findIndex((i) => i == ".");
    let lastOccupiedIndex = drive.findLastIndex((i) => i != ".");

    while (firstFreeIndex < lastOccupiedIndex && firstFreeIndex != -1 && lastOccupiedIndex != -1) {
        drive[firstFreeIndex] = drive[lastOccupiedIndex];
        drive[lastOccupiedIndex] = ".";
        let freeIndex = findIndexFrom(drive, (i) => i == ".", firstFreeIndex, lastOccupiedIndex);
        let occupiedIndex = findLastIndexFrom(
            drive,
            (i) => i != ".",
            lastOccupiedIndex,
            firstFreeIndex
        );

        if (freeIndex == -1 || occupiedIndex == -1) {
            break;
        } else {
            firstFreeIndex = freeIndex;
            lastOccupiedIndex = occupiedIndex;
        }
    }

    let checksum = 0;
    for (let i = 0; i < drive.length; i++) {
        if (drive[i] == ".") {
            break;
        }

        checksum += i * parseInt(drive[i]);
    }

    return checksum;
}

function solvePuzzle2(input: string): number {
    let fileId = 0;
    let driveInfo = input
        .split("")
        .map((v, i) => ({
            size: parseInt(v),
            id: i % 2 == 0 ? fileId++ : -1,
        }))
        .filter((i) => !isNaN(i.size));
    if (driveInfo.length % 2 == 0) {
        driveInfo.pop();
    }

    fileId--;

    let lastSwap = -1;

    for (fileId; fileId > -1; fileId--) {
        const fileIndex = findLastIndexFrom(driveInfo, (v) => v.id == fileId, lastSwap);

        if (fileIndex == -1) {
            continue;
        }

        const spaceIndex = driveInfo.findIndex(
            (v, i) => v.id == -1 && v.size >= driveInfo[fileIndex].size && i < fileIndex
        );

        if (spaceIndex == -1) {
            continue;
        }

        const file = driveInfo[fileIndex];
        const space = driveInfo[spaceIndex];
        const next = driveInfo.at(fileIndex + 1);
        const prev = driveInfo.at(fileIndex - 1);
        const removeCount = 1 + (!!next ? 1 : 0) + (!!prev ? 1 : 0);

        lastSwap = fileIndex;

        if (fileIndex - 1 == spaceIndex) {
            driveInfo.splice(
                spaceIndex,
                removeCount,
                { size: 0, id: -1 },
                { ...file },
                { size: file.size + (space.size - file.size) + (next?.size ?? 0), id: -1 }
            );
        } else {
            driveInfo.splice(fileIndex - 1, removeCount, {
                size: file.size + (next?.size ?? 0) + (prev?.size ?? 0),
                id: -1,
            });

            driveInfo.splice(
                spaceIndex,
                1,
                { size: 0, id: -1 },
                { ...file },
                { size: space.size - file.size, id: -1 }
            );
        }
    }

    let drive: string[] = [];
    for (let i = 0; i < driveInfo.length; i++) {
        let id: string;
        if (driveInfo[i].id != -1) {
            id = driveInfo[i].id.toString();
        } else {
            id = ".";
        }

        const size = driveInfo[i].size;
        for (let j = 0; j < size; j++) {
            drive.push(id);
        }
    }
    let checksum = 0;
    for (let i = 0; i < drive.length; i++) {
        if (drive[i] == ".") {
            continue;
        }

        checksum += i * parseInt(drive[i]);
    }

    return checksum;
}
function findIndexFrom<T>(
    array: T[],
    condition: (v: T, i: number) => boolean,
    start: number = 0,
    end: number = -1
): number {
    for (let i = start; i < array.length || end != -1 ? i < end : false; i++) {
        if (condition(array[i], i)) {
            return i;
        }
    }
    return -1;
}

function findLastIndexFrom<T>(
    array: T[],
    condition: (v: T, i: number) => boolean,
    start: number = -1,
    end: number = -1
): number {
    for (
        let i = start == -1 ? array.length - 1 : start;
        i >= 0 || end != -1 ? i > end : false;
        i--
    ) {
        if (condition(array[i], i)) {
            return i;
        }
    }
    return -1;
}

function hydrateInput(input: string) {
    let drive: string[] = [];
    let fileCount = 0;
    for (let i = 0; i < input.length; i++) {
        let id: string;
        if (i % 2 == 0) {
            id = fileCount.toString();
            fileCount++;
        } else {
            id = ".";
        }

        const size = parseInt(input[i]);
        for (let j = 0; j < size; j++) {
            drive.push(id);
        }
    }

    return drive;
}

const testInput = `2333133121414131402`;
</script>
