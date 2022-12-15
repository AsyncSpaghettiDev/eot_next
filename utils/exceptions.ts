export class AuthException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'AuthException'
    }
}

export class UserNotAuthenticatedException extends Error {
    constructor() {
        super('User not authenticated')
        this.name = 'UserNotAuthenticatedException'
    }
}