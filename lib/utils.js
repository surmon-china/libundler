"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabcase = exports.pascalify = exports.loadProjectFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const logger_1 = require("./logger");
const loadProjectFile = (filePath, strict = false) => {
    const target = path_1.default.resolve(process_1.default.cwd(), filePath);
    if (fs_1.default.existsSync(target)) {
        return require(target);
    }
    else if (strict) {
        logger_1.logger.warn(`File not found ${target}`);
    }
    return null;
};
exports.loadProjectFile = loadProjectFile;
// Helpers for creating kebab-case/PascalCase versions of string
// Form from: https://github.com/team-innovation/vue-sfc-rollup/blob/master/lib/helpers.js
const pascalify = (text) => {
    const camelized = text.replace(/-([a-z0-9])/g, (c) => c[1].toUpperCase());
    return camelized.charAt(0).toUpperCase() + camelized.slice(1);
};
exports.pascalify = pascalify;
const kebabcase = (text) => {
    return text
        .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
};
exports.kebabcase = kebabcase;
