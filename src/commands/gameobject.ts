import chalk from "chalk";
import path from 'path';
import { isMe2DProject, modifyFile } from "../helpers.js";

export async function newGameObject(gameObjectName: string, sceneName: string) {
    if (!(await isMe2DProject())) {
        console.error(chalk.red('Non sei in un progetto me2D.'));
        return;
    }
    // Imposta il percorso dei template e delle cartelle di destinazione
    const templatePath = path.resolve(__dirname, 'templates', 'gameobject-template.txt');
    const targetPath = path.resolve(process.cwd(), 'src', 'gameobjects', `${gameObjectName}.ts`);
    await modifyFile(templatePath, targetPath, { gameObjectName });
    console.log(chalk.green(`GameObject ${gameObjectName} created successfully at ${targetPath}`));
}