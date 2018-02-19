import WorldWind from '@nasaworldwind/worldwind';

class RadiantCircleTile extends WorldWind.ColoredTile {
    shape() {
        let circle = this.createCanvas(this._width, this._height),
            ctx = circle.getContext('2d'),
            r2 = this._radius + this._radius;

        circle.width = circle.height = r2;

        let gradient = ctx.createRadialGradient(this._radius, this._radius, 0, this._radius, this._radius, this._radius);
        gradient.addColorStop(0, "rgba(0,0,0,1)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(this._radius, this._radius, this._radius, 0, Math.PI * 2, true);

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.closePath();

        return circle;
    }
}

export default RadiantCircleTile;