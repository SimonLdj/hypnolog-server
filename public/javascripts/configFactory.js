'use strict';
/**
 * Configuration Factory
 * Set of static util functions to deal with configurations.
 */
define(function (require) {

    // define consts
    const USER_CONFIG_FILE_NAME = "config.json";
    const DEFAULT_CONFIG_FILE_NAME = "default-config.json"
    const DEFAULT_CONFIG = {};

    // save loaded config object
    let config = null;

    // public functions:
    let exports = {};

    /**
     * Load or return already loaded config file.
     * First look for user file, then for default file, and then defult-hard-coded config object.
     * This will remember first loaded configuration and will not load them again.
     *
     * @return {Promise} which will be resolved when the configurations are loaded
     */
    exports.getConfig = function() {
        // TODO: allow less strict json file? allow comments, and trailing comma (,)
        // Now we use SystemJS to parse json files, and it fails of file contain such error

        // if config file was already loaded
        if (config)
            return Promise.resolve(config);

        // look for user config file
        return System.import(USER_CONFIG_FILE_NAME)
        .catch(e => {
            console.warn("User config file couldn't be loaded from: " + USER_CONFIG_FILE_NAME);
            console.warn(e);
            // look for default config file
            console.warn("Will use default config file instead: " + DEFAULT_CONFIG_FILE_NAME);
            return System.import(DEFAULT_CONFIG_FILE_NAME);
        })
        .catch(e => {
            console.error("Default config file couldn't be loaded from: " + DEFAULT_CONFIG_FILE_NAME);
            console.error(e);
            // use default hard-coded config object
            console.warn("Fall back to system config");
            return Promise.resolve(DEFAULT_CONFIG);
        })
        .then(r => {
            // save config object for future use
            config = r;
            console.log("Config file loaded successfully");
            return Promise.resolve(r);
        });
    }

    /**
     * Get the visualizers from the loaded configuration.
     * Load the configuration if it is not loaded.
     *
     * @return {Promise} which will be resolved when the configurations are loaded
     */
    exports.getVisualizers = function() {

        return exports.getConfig()
        .then(r => {
            let vis = (r.visualizers != null ? r.visualizers : {});
            return Promise.resolve(vis);
        });
    }

    // Expose public methods
    return exports;
});
