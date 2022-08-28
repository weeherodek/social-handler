module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '6.0.1',
      skipMD5: true
    },
    autoStart: true
  }
}
