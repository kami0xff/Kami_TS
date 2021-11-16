export class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getx() {
        return this.x;
    }
    setx(value) {
        this.x = value;
    }
    gety() {
        return this.y;
    }
    sety(value) {
        this.y = value;
    }
    getz() {
        return this.z;
    }
    setz(value) {
        this.z = value;
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
    toFloat32Array() {
        return new Float32Array(this.toArray());
    }
}
