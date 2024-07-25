import simpleGit from 'simple-git';
import fs from 'fs-extra';
import path from 'path';

import { input } from '@inquirer/prompts';
import ora from 'ora';
import chalk from 'chalk';
import { exec } from 'child_process';

const REPO_URL = 'https://github.com/LorenzoCorbella74/my-engine-2d.git';

// Funzione per scaricare un repository GitHub
async function downloadRepo(targetPath: string) {
    const spinner = ora('Cloning repository...').start();
    try {
        const git = simpleGit();
        await git.clone(REPO_URL, targetPath);
        await fs.remove(path.join(targetPath, '.git'));
        spinner.succeed('Repository cloned successfully!');
    } catch (error) {
        spinner.fail('Failed to clone repository.');
        throw error;
    }
}

// Si personalizza il progetto (package.json + mye2d.json)
async function customizeProject(projectPath: string, answers: { [key: string]: string }) {
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = answers.name;
    packageJson.description = answers.description;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    await fs.writeJson(path.join(projectPath, 'mye2d.json'), { version: packageJson.version }, { spaces: 2 });
}

// npm install
function installDependencies(projectPath: string) {
    return new Promise<void>((resolve, reject) => {
        const spinner = ora('Installing dependencies...').start();
        exec('npm install', { cwd: projectPath }, (error, stdout, stderr) => {
            if (error) {
                spinner.fail('Failed to install dependencies.');
                console.error(stderr);
                return reject(error);
            }
            spinner.succeed('Dependencies installed successfully!');
            console.log(stdout);
            resolve();
        });
    });
}

// Comando "new" per creare un nuovo progetto
export async function newProject(projectName: string) {
    console.log(chalk.green(`Creating game project "${projectName}".`));
    const description = await input({ message: 'Describe your project:', default: 'A game about...' });
    const answers = { name: projectName, description: description };

    const targetPath = path.resolve(process.cwd(), projectName);
    try {
        await downloadRepo(targetPath);
        await customizeProject(targetPath, answers);
        await installDependencies(targetPath);
        console.log(chalk.green(`Project created succesfully in ${targetPath}`));
        console.log(chalk.blue(`Enter in the project folder and run:`));
        console.log(chalk.blue(`- "mye2d --scene  <name>" to create game scenes`));
        console.log(chalk.blue(`- "mye2d --gameobject <name>" to to create game objects`)+'\n');
    } catch (error) {
        console.error(chalk.red('Error:', error));
    }
}



