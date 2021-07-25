"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRollup = void 0;
const rollup_1 = require("rollup");
const constant_1 = require("./constant");
const config_default_1 = require("./config.default");
const config_normalize_1 = require("./config.normalize");
const logger_1 = require("./logger");
const utils_1 = require("./utils");
const runRollup = () => {
    // config
    const defaultConfig = config_default_1.getDefaultConfig();
    const bundlerConfig = utils_1.loadProjectFile(constant_1.LIB_CONFIG_FILE_NAME);
    let rollupConfig = null;
    /** !bundlerConfig > use default config */
    if (!bundlerConfig) {
        if (!defaultConfig.libName) {
            logger_1.logger.error(`Invalid name of package.json`);
            process.exit(1);
        }
        else {
            rollupConfig = config_normalize_1.normalizeRollupConfig(defaultConfig);
        }
    }
    // function config > function(defaultRollupConfig)
    if (typeof bundlerConfig === 'function') {
        rollupConfig = bundlerConfig(config_normalize_1.normalizeRollupConfig(defaultConfig));
    }
    // array
    if (Array.isArray(bundlerConfig)) {
        rollupConfig = bundlerConfig.map((item) => {
            return config_normalize_1.normalizeRollupConfig({ ...defaultConfig, ...item });
        });
    }
    // simple config
    const libundlerConfig = {
        ...defaultConfig,
        ...bundlerConfig,
    };
    rollupConfig = config_normalize_1.normalizeRollupConfig(libundlerConfig);
    if (libundlerConfig.verbose) {
        // log config
        logger_1.br();
        logger_1.logger.log(`libundler config ↓\n`);
        logger_1.dir(libundlerConfig);
        logger_1.br();
        logger_1.logger.log(`rollup config ↓\n`);
        logger_1.dir(rollupConfig);
    }
    // log title
    const bundlePrefix = Array.isArray(rollupConfig)
        ? `${rollupConfig.length} libraries`
        : `library ${logger_1.yellow(libundlerConfig.libName)}`;
    // start
    logger_1.logger.info(`${bundlePrefix} bundling...`);
    // rollup bundle
    const doBundle = async (options) => {
        // rollup write
        const write = async (outputOptions) => {
            // write the bundle to disk
            const { output } = await bundle.write(outputOptions);
            const outChunk = output[0];
            // closes the bundle
            await bundle.close();
            logger_1.br();
            logger_1.logger.success(`${bundlePrefix} - ${logger_1.yellow(outChunk.fileName)} is bundled!`);
            if (libundlerConfig.verbose) {
                logger_1.dir(outChunk);
            }
            return output;
        };
        const bundle = await rollup_1.rollup(options);
        if (!options.output) {
            return null;
        }
        if (Array.isArray(options.output)) {
            return Promise.all(options.output.map(write));
        }
        else {
            return write(options.output);
        }
    };
    (Array.isArray(rollupConfig)
        ? Promise.all(rollupConfig.map(doBundle))
        : doBundle(rollupConfig))
        .then(() => {
        logger_1.br();
        logger_1.logger.success(`${bundlePrefix} bundle done!`);
        logger_1.br();
        process.exit(0);
    })
        .catch((error) => {
        logger_1.logger.error(`bundle error!`, error);
        process.exit(1);
    });
};
exports.runRollup = runRollup;
