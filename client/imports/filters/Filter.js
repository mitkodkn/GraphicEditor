export default class Filter {
    constructor(image, canvas, width, height) {
        this.image = image;
        this.canvas = canvas;

        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.drawImage(this.image);
        this.pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    filterImage(filter, image, var_args) {
        const args = [this.getPixels(image)];

        for (let i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        return filter.apply(null, args);
    };
}
