import chalk from "chalk";
import path from 'path';
import { fileURLToPath } from 'url';
import { isMe2DProject, modifyFile, capitalizeFirstLetter } from "../helpers.js";
import { sceneTemplate } from "../templates/scene-template.js";

// Command "scene" to create a new scene
export async function newScene(sceneName: string) {
    if (!(await isMe2DProject())) {
        console.error(chalk.red('Current folder is not a me2D project.'));
        return;
    }
    const SceneName = capitalizeFirstLetter(sceneName);
    const targetFile = path.resolve(process.cwd(), 'src', 'game','Scenes', `${sceneName}`, `${sceneName}.ts`);
    await modifyFile(sceneTemplate, targetFile, { name:SceneName });
    console.log(chalk.green(`Scene ${SceneName} created successfully at ${targetFile}`));
}