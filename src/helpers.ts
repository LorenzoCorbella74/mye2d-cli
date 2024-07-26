import fs from 'fs-extra';
import path from 'path';

// Verifica se è un progetto me2D
export async function isMe2DProject(): Promise<boolean> {
    const cwd = process.cwd();
    try {
        const mye2dJsonPath = path.join(cwd, 'mye2d.json');
        const fileExists = await fs.pathExists(mye2dJsonPath);
        return fileExists;
    } catch {
        return false;
    }
}

// Funzione per creare una scena o un game object
export async function modifyFile(templateContent: string, targetPath: string, replacements: { [key: string]: string }) {
    let replacedContent = templateContent;
    for (const [key, value] of Object.entries(replacements)) {
        replacedContent = replacedContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    await fs.outputFile(targetPath, replacedContent);
}

export async function createFile(filePath: string, content: string) {
    await fs.outputFile(filePath, content);
}


export async function createFolder(folderPath: string) {
    await fs.ensureDir(folderPath);
}

export function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}