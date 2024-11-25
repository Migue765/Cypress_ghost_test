const requireTestFiles = require.context('../settings_management', true, /\.cy\.js$/);

requireTestFiles.keys().forEach(requireTestFiles);

describe('Run All Scenarios', () => {
    // All tests in the tag_management folder will be executed
});
