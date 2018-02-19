import WorldWind from '@nasaworldwind/worldwind';

class RadiantSquareTile extends WorldWind.ColoredTile {
    shape() {
        let square = this.createCanvas(this._width, this._height),
            ctx = square.getContext('2d'),
            r2 = this._radius + this._radius;

        square.width = square.height = r2;

        let centerX = this._radius / 2;
        let centerY = this._radius / 2;
        let gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, this._radius);
        gradient.addColorStop(0, "rgba(0,0,0,1)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, r2, r2);

        return square;
    }
}

export default RadiantSquareTile;