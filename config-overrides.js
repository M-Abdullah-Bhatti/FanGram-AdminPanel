const path = require("path");

module.exports = function override(config) {
	config.resolve = {
		...config.resolve,
		alias: {
			"@assets": path.resolve(__dirname, "src/Assets/"),
			"@component": path.resolve(__dirname, "src/Components/"),
		},
	};

	return config;
};
