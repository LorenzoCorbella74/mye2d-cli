#! /usr/bin/env node

import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";

// Commands
import { newProject } from "./commands/project.js";
import { newScene } from "./commands/scene.js";
import { newGameObject } from "./commands/gameobject.js";

const program = new Command();

console.log(figlet.textSync("MY-ENGINE-2D  Cli"));

program
    .version("0.1.0")
    .description("A CLI tool for the game engine my-engine-2d")
    .option("-n, --new <name>", "Create a game project")
    .option("-s, --scene  <name>", "Create a scene")
    .option("-g, --gameobject <name>", "Create a game object")
    .parse(process.argv);

const options = program.opts();

if (options.new) {
    const projectName = options.new;
    await newProject(projectName);
} else if (options.scene) {
    const sceneName = options.scene;
    await newScene(sceneName);
} else if (options.gameobject) {
    const gameObjectName = options.gameobject;
    await newGameObject(gameObjectName, 'todo');
} else {
    console.log(
        chalk.yellow("Please provide a valid command like --new, --scene or --gameobject")
    );
}

