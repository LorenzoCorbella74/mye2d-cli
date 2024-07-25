import chalk from "chalk";
import path from 'path';
import { isMe2DProject, createFile } from "../helpers";

// Comando "scene" per creare una nuova scena
export async function newScene(sceneName: string) {
    if (!(await isMe2DProject())) {
        console.error(chalk.red('Non sei in un progetto me2D.'));
        return;
    }
    // Imposta il percorso dei template e delle cartelle di destinazione
    const templatePath = path.resolve(__dirname, 'templates', 'scene-template.txt');
    const targetPath = path.resolve(process.cwd(), 'src', 'scenes', `${sceneName}.ts`);
    await createFile(templatePath, targetPath, { sceneName });
    console.log(chalk.green(`Scene ${sceneName} created successfully at ${targetPath}`));
}