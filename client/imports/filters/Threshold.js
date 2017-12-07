import Filter from "./Filter";

export default class Threshold extends Filter {
    constructor(image, canvas, width, height) {
        super(image, canvas, width, height);
        this.name = 'Threshold';

    }

    execute(value = 40) {
        const data = this.pixels.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= value) ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = v;
        }

        this.ctx.putImageData(this.pixels, 0, 0);
    }
}
