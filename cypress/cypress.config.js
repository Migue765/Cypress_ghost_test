const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      LOCAL_HOST: "http://localhost:2368/ghost/",
      EMAIL: "test@test.com",
      PASSWORD: "6-pVzAeXxT9Uq_-",
      NAME: "Jaime Larson",
      NAME_TAG_1: 'New Spectacular Tag 1',
      NAME_TAG_2: 'New Spectacular Tag 2',
      TAG_COLOR: 'FF5733',
      DESCRIPTION: 'This is a description for the new tag. It is a very long description that will be used to test the functionality of the tag creation process.',
      NEW_NAME_TAG: 'New Spectacular Tag 1 Edited',
      APIREST: "http://localhost:3006/api/data"

    }
  },
});
