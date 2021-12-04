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
    static zero() {
        return new Vector3();
    }
    static one() {
        return new Vector3(1, 1, 1);
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
    toFloat32Array() {
        return new Float32Array(this.toArray());
    }
    copyFrom(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }
    setFromJson(json) {
        if (json.x !== undefined) {
            this.x = Number(json.x);
        }
        if (json.y !== undefined) {
            this.y = Number(json.y);
        }
        if (json.z !== undefined) {
            this.z = Number(json.z);
        }
    }
}
