/********************************************************************
 * @author:      Kaven
 * @email:       kaven@wuwenkai.com
 * @website:     http://blog.kaven.xyz
 * @file:        [kaven-proxy] /proxy.js
 * @create:      2022-04-24 10:44:43.889
 * @modify:      2026-07-07 10:10:56.124
 * @version:     
 * @times:       19
 * @lines:       48
 * @copyright:   Copyright © 2022-2026 Kaven. All Rights Reserved.
 * @description: [description]
 * @license:     [license]
 ********************************************************************/

import { ConsoleLogger, LoggingAgent, Strings_Production } from "kaven-basic";
import { AppendPathThenCreateDirectory, AppendPathThenCreateParentDirectory, FileLogger, StartProxy, StdLogger } from "kaven-utils";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const isProduction = process.env.NODE_ENV === Strings_Production;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Logger = new LoggingAgent();

if (isProduction) {
    Logger.Handlers.add(new StdLogger());

    const LOG_FILE_PATH = AppendPathThenCreateParentDirectory(__dirname, "./logs/logs.txt");
    const ANSI_LOG_FILE_PATH = AppendPathThenCreateParentDirectory(__dirname, "./logs/ansi_logs.txt");

    Logger.Handlers.add(FileLogger.StartNew(LOG_FILE_PATH, { StripAnsi: true }));
    Logger.Handlers.add(FileLogger.StartNew(ANSI_LOG_FILE_PATH));
} else {
    Logger.Handlers.add(new ConsoleLogger(true));
}

const CONFIG_DIR = args[0] || AppendPathThenCreateDirectory(__dirname, "./config");

StartProxy(CONFIG_DIR, Logger).catch(err => {
    Logger.Error(err);
    process.exit(1);
});
