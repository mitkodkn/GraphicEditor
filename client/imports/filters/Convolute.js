import Filter from "./Filter";

export default class Convolute extends Filter {
    constructor(image, canvas, width, height) {
        super(image, canvas, width, height);
        this.name = 'Convolute';
    }

    execute(matrix, opaque = false) {
        const side = Math.round(Math.sqrt(matrix.length));
        const halfSide = Math.floor(side / 2);
        const src = this.pixels.data;
        const sourceWidth = this.pixels.width;
        const sourceHeight = this.pixels.height;

        // pad output by the convolution matrix
        const width = sourceWidth;
        const h = sourceHeight;

        const output = this.ctx.createImageData(width, h);
        const destination = output.data;

        // go through the destination image pixels
        const alphaFac = opaque ? 1 : 0;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < width; x++) {
                const sy = y;
                const sx = x;
                const dstOff = (y * width + x) * 4;

                // calculate the weighed sum of the source image pixels that
                // fall under the convolution matrix
                let r = 0, g = 0, b = 0, a = 0;
                for (let cy = 0; cy < side; cy++) {
                    for (let cx = 0; cx < side; cx++) {
                        const scy = sy + cy - halfSide;
                        const scx = sx + cx - halfSide;
                        if (scy >= 0 && scy < sourceHeight && scx >= 0 && scx < sourceWidth) {
                            const srcOff = (scy * sourceWidth + scx) * 4;
                            const wt = matrix[cy * side + cx];
                            r += src[srcOff] * wt;
                            g += src[srcOff + 1] * wt;
                            b += src[srcOff + 2] * wt;
                            a += src[srcOff + 3] * wt;
                        }
                    }
                }

                destination[dstOff] = r;
                destination[dstOff + 1] = g;
                destination[dstOff + 2] = b;
                destination[dstOff + 3] = a + alphaFac * (255 - a);
            }
        }

        this.ctx.putImageData(output, 0, 0);
    }
}
