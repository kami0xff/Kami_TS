export class Color {
    private red: number;
    private green: number;
    private blue: number;
    private alpha: number;

    public constructor(red: number = 255, blue: number = 255, green: number = 255, alpha: number = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    public getRed(): number {
        return this.red;
    }

    public getRedFloat(): number {
        return this.red / 255.0;
    }

    public setRed(value: number): void {
        this.red = value;
    }

    public getGreen(): number {
        return this.green;
    }

    public getGreenFloat(): number {
        return this.green / 255.0;
    }

    public setGreen(value: number): void {
        this.green = value;
    }

    public getBlue(): number {
        return this.blue;
    }

    public getBlueFloat(): number {
        return this.blue / 255.0;
    }

    public setBlue(value: number): void {
        this.blue = value;
    }

    public getAlpha(): number {
        return this.alpha;
    }

    public getAlphaFloat(): number {
        return this.alpha / 255.0;
    }

    public setAlpha(value: number): void {
        this.alpha = value;
    }

    public toArray(): number[] {
        return [this.red, this.green, this.blue, this.alpha];
    }

    public toFloatArray(): number[] {
        return [this.red / 255, this.green / 255, this.blue / 255, this.alpha / 255];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toFloatArray());
    }

    public static white():Color{
        return new Color(255,255,255,255);
    }

    public static black():Color{
        return new Color(0,0,0,255);
    }

    public static red():Color{
        return new Color(255,0,0,255);
    }

    public static green():Color{
        return new Color(0,255,0,255);
    }

    public static blue():Color{
        return new Color(0,0,255,255);
    }
}