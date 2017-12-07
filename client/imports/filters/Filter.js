export default class Filter {
    constructor(image, canvas, width, height) {
        this.image = image;
        this.canvas = canvas;

        this.width = width;
        this.height = height;

        this.ctx = this.canvas.getContext('2d');
        this.pixels = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

        console.log(this.image);
        console.log(this.canvas);
        console.log(this.width);
        console.log(this.height);
        console.log(this.ctx);
        console.log(this.pixels);
    }
}
