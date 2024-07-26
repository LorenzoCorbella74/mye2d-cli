export const gameObjectTemplate =` 
import { GameObject } from '../../../../engine/GameObject';
import { SpriteComponent } from '../../../../engine/components/sprite';
import { Entity } from '../../../../engine/decorators';

@Entity()
export class {{name}} extends GameObject {

    constructor(name: string, spriteName: string) {
        super(name);
        this.addComponent(new SpriteComponent(this, spriteName));
    }
}`;