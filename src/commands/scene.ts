import chalk from "chalk";
import path from 'path';
import { isMe2DProject, modifyFile, createFolder, capitalizeFirstLetter } from "../helpers.js";

// Comando "scene" per creare una nuova scena
export async function newScene(sceneName: string) {
    if (!(await isMe2DProject())) {
        console.error(chalk.red('You are not in a project folder made with my-engine-2D.'));
        return;
    }
    // Imposta il percorso dei template e delle cartelle di destinazione
    const templatePath = path.resolve(__dirname, 'templates', 'scene-template.txt');
    const SceneName = capitalizeFirstLetter(sceneName);
    const targetFolder = path.resolve(process.cwd(), 'src', 'game','Scenes', `${SceneName}`);
    await createFolder(targetFolder);
    const targetFile = path.resolve(process.cwd(), 'src', 'game','Scenes', `${SceneName}`, `${sceneName}.ts`);
    await modifyFile(templatePath, targetFile, { SceneName });
    console.log(chalk.green(`Scene ${SceneName} created successfully at ${targetFile}`));
}