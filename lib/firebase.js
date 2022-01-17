const process = require('process')

const { initializeApp, applicationDefaults } = require('firebase-admin')

const GOOGLE_APPLICATION_CREDENTIALS = process.env['GOOGLE_APPLICATION_CREDENTIALS']

initializeApp({
    credential: applicationDefaults()
})
