import {Zone} from "./Zone.js";
import {Sprite} from "../graphics/Sprite.js";
import {Shader} from "../gl/shader.js";
import {SimObject} from "./SimObject.js";
import {SpriteComponent} from "../components/SpriteComponent.js";

export class TestZone extends Zone {
    private parentObject: SimObject | undefined;
    private parentSprite: SpriteComponent | undefined;

    private testObject: SimObject | undefined;
    private testSprite: SpriteComponent | undefined;

    public load(): void {
        this.parentObject = new SimObject(0, "parentObject");
        this.parentSprite = new SpriteComponent("test", "crate");
        this.parentObject.addComponent(this.parentSprite);
        this.parentObject.transform.position.setx(300);
        this.parentObject.transform.position.sety(300);

        this.testObject = new SimObject(1, "testObject");
        this.testSprite = new SpriteComponent("test", "crate");
        this.testObject.addComponent(this.testSprite);
        this.testObject.transform.position.setx(120);
        this.testObject.transform.position.sety(120);

        this.parentObject.addChild(this.testObject);

        this.getScene()?.addObject(this.parentObject);

        super.load();
    }

    public update(time: number): void {
        // @ts-ignore
        this.parentObject.transform.rotation.setz(this.parentObject.transform.rotation.getz() + 0.01);
        this.testObject?.transform.rotation.setz(this.testObject?.transform.rotation.getz() + 0.05);
        super.update(time);
    }

}