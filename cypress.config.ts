const { defineConfig } = require('cypress')
const cypressFirebasePlugin = require('cypress-firebase').plugin
const admin = require('firebase-admin')

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(on: any, config: any) {
      return cypressFirebasePlugin(on, config, admin, {})
    }
  }
})
