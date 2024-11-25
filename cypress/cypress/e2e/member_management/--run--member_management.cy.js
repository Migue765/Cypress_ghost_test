const requireTestFiles = require.context('../member_management', true, /\.cy\.js$/);

requireTestFiles.keys().forEach(requireTestFiles);

describe('Run All Scenarios', () => {
    // All tests in the member_management folder will be executed
});
