export class ExpectedError {
    code: number
    log?: string
    error?: any

    constructor({ code, log, error }: { code: number, log?: string, error?: any }) {
        this.code = code
        this.log = log
        this.error = error
    }
}
