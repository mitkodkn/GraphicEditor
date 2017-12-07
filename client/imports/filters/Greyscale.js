import Filter from "./Filter";

export default class Greyscale extends Filter {
    constructor(pixels) {
        super();
        this.pixels = pixels;
    }

    execute() {
        const data = this.pixels.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            data[i] = data[i + 1] = data[i + 2] = v
        }
    }
}