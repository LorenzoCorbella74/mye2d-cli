import fs from 'fs-extra';
import path from 'path';


// Verifica se è un progetto me2D
export async function isMe2DProject(): Promise<boolean> {
    const cwd = process.cwd();
    try {
        const packageJsonPath = path.join(cwd, 'package.json');
        const packageJson = await fs.readJson(packageJsonPath);
        return packageJson.dependencies && packageJson.dependencies.me2d !== undefined;
    } catch {
        return false;
    }
}

// Funzione per creare una scena o un game object
export async function createFile(templatePath: string, targetPath: string, replacements: { [key: string]: string }) {
    const content = await fs.readFile(templatePath, 'utf-8');
    let replacedContent = content;
    for (const [key, value] of Object.entries(replacements)) {
        replacedContent = replacedContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    await fs.outputFile(targetPath, replacedContent);
}