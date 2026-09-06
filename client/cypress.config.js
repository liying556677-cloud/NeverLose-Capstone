const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    env: {
      already_exist_user_email: 't@gmail.com',
      already_exist_user_pw: '12341234',
      already_exist_user_phone: '5555555555',
      invalid_test_email: 'witgmail.com',
      invalid_test_pw: '123',
      valid_test_email: 't1@gmail.com',
      valid_test_pw: '12341234',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
