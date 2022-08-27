module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '4.9.0',
      skipMD5: true
    },
    autoStart: true
  }
}
