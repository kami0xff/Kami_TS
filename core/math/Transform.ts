import {Vector3} from "./vector3.js";
import {Matrix4x4} from "./matrix4x4.js";

export class Transform {
    public position: Vector3 = Vector3.zero();
    public rotation: Vector3 = Vector3.zero();
    public scale: Vector3 = Vector3.one();

    public copyFrom(transform:Transform):void{
        this.position.copyFrom(transform.position);
        this.rotation.copyFrom(transform.rotation);
        this.scale.copyFrom(transform.scale);
    }

    public getTransformationMatrix():Matrix4x4{
        let translation = Matrix4x4.translation(this.position);
        //TODO add x and y for 3d
        let rotation = Matrix4x4.rotationXYZ(this.rotation.getx(),this.rotation.gety(),this.rotation.getz());
        let scale = Matrix4x4.scale(this.scale);

        // T * R * S
        return Matrix4x4.multiply(Matrix4x4.multiply(translation, rotation), scale);
    }
    public setFromJson(json: any): void {
        if(json.position !== undefined){
            this.position.setFromJson(json.position);
        }
        if(json.rotation !== undefined){
            this.rotation.setFromJson(json.rotation);
        }
        if(json.scale !== undefined) {
            this.scale.setFromJson(json.scale);
        }
    }
}