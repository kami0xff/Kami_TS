import {Material} from "./Material.js";

class MaterialReferenceNode {
    public material: Material;
    public referenceCount: number = 1;

    public constructor(material: Material) {
        this.material = material;
    }
}

export class MaterialManager {
    private static materials: {[name:string]:MaterialReferenceNode} = {}
    private constructor() {
    }

    public static registerMaterial(material:Material):void{
        if(MaterialManager.materials[material.getName()] === undefined) {
            MaterialManager.materials[material.getName()] = new MaterialReferenceNode(material);
        }
    }

    public static getMaterial(materialName:string):Material | undefined{
        if(MaterialManager.materials[materialName] === undefined){
            return undefined;
        }
        else{
            MaterialManager.materials[materialName].referenceCount++;
            return MaterialManager.materials[materialName].material;
        }
    }

    public static releaseMaterial(materialName:string):void{
        if(MaterialManager.materials[materialName] === undefined){
            console.warn("cannot release a material that has not been registered");
        }
        else{
            MaterialManager.materials[materialName].referenceCount--;
            if(MaterialManager.materials[materialName].referenceCount < 1){
                MaterialManager.materials[materialName].material.destroy();
                // @ts-ignore :(
                MaterialManager.materials[materialName] = undefined;
                delete MaterialManager.materials[materialName];

            }
        }
    }
}