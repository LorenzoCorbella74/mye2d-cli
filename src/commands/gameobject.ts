import chalk from "chalk";
import path from 'path';
import { capitalizeFirstLetter, isMe2DProject, modifyFile } from "../helpers.js";
import { gameObjectTemplate } from "../templates/gameobject-template.js";

// Command "gameobject" to create a new game object
export async function newGameObject(gameObjectName: string, sceneName: string) {
    if (!(await isMe2DProject())) {
        console.error(chalk.red('Current folder is not a me2D project.'));
        return;
    }
    const SceneName = capitalizeFirstLetter(sceneName);
    const targetFile = path.resolve(process.cwd(), 'src', 'game','Scenes', `${sceneName}`, 'entities', `${gameObjectName}.ts`);
    await modifyFile(gameObjectTemplate, targetFile, { name:gameObjectName });
    console.log(chalk.green(`GameObject ${gameObjectName} created successfully at ${targetFile}`));
}
