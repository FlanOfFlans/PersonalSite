export function linify(input: string): number[][] {
    const lines =
        input.split("\n").map((line) =>
            line
                .split(" ")
                .filter((i) => i != "")
                .map((i) => parseInt(i))
        ) ?? [];

    return lines;
}
