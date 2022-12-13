class MeiliSearchTimeOutError extends Error {
  constructor(message: string) {
    super(message)

    // Make errors comparison possible. ex: error instanceof MeiliSearchTimeOutError.
    Object.setPrototypeOf(this, MeiliSearchTimeOutError.prototype)

    this.name = 'MeiliSearchTimeOutError'
  }
}

export { MeiliSearchTimeOutError }
