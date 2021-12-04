import {BaseComponent} from "./BaseComponent.js";
import {Sprite} from "../graphics/Sprite.js";
import {Shader} from "../gl/shader.js";
import {IComponentData} from "./IComponentData";
import {IComponentBuilder} from "./IComponentBuilder";
import {IComponent} from "./IComponent";

export class SpriteComponentData implements IComponentData {
    public name: string;
    public materialName: string;

    public setFromJson(json: any): void {
        if (json.name !== undefined) {
            this.name = String(json.name);
        }
        if (json.materialName !== undefined) {
            this.materialName = String(json.materialName);
        }
    }
}

export class spriteComponentBuilder implements IComponentBuilder {
    //ah so this syntax works fix my code with this syntax
    public get type(): string {
        return "sprite";
    }

    public buildFromJson(json: any): IComponent {
        let data = new SpriteComponentData();
        data.setFromJson(json);
        return new SpriteComponent(data);
    }

}

export class SpriteComponent extends BaseComponent {
    private sprite: Sprite;

    public constructor(data: SpriteComponentData) {
        super(data);
        this.sprite = new Sprite(name, data.materialName)
    }

    public load() {
        this.sprite.load();
    }

    public render(shader: Shader): void {
        this.sprite.draw(shader, this.owner!.getWorldMatrix());
        super.render(shader);
    }
}