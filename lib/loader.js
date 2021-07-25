"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBundlerConfig = exports.loadUserPackageJSON = exports.loadProjectFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const constant_1 = require("./constant");
const logger_1 = require("./logger");
const loadProjectFile = (filePath, strict = false) => {
    const target = path_1.default.resolve(process.cwd(), filePath);
    if (fs_1.default.existsSync(target)) {
        return require(target);
    }
    else if (strict) {
        logger_1.logger.warn(`File not found ${target}`);
    }
    return null;
};
exports.loadProjectFile = loadProjectFile;
const loadUserPackageJSON = () => {
    return exports.loadProjectFile('package.json', true);
};
exports.loadUserPackageJSON = loadUserPackageJSON;
const loadBundlerConfig = () => {
    return exports.loadProjectFile(constant_1.CONFIG_FILE_NAME);
};
exports.loadBundlerConfig = loadBundlerConfig;
