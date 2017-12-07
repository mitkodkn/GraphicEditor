import Filter from "./Filter";

export default class Greyscale extends Filter {
    constructor(image, canvas, width, height) {
        super(image, canvas, width, height);
        this.name = 'Brightness';

        this.previousValue = 0;
    }

    execute(value) {
        const data = this.pixels.data;

        if (value < this.previousValue) {
            value = -value;
        }

        this.previousValue = Math.abs(value);

        console.log(value);
        console.log(this.previousValue);

        for (let i = 0; i < data.length; i += 4) {
            data[i] += value;
            data[i + 1] += value;
            data[i + 2] += value;
        }

        this.ctx.putImageData(this.pixels, 0, 0);
    }
}
