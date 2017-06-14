const createConnection = (args) => {
  return {
    connect: () => { },
    end: () => { }
  }
}

module.exports = {
  createConnection: createConnection,
}
