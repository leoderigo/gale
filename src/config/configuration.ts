export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: null,
    realtec: {
        rh: {
            email: process.env.RH_EMAIL
        },
        noReply: {
            email: process.env.NOREPLY_EMAIL,
            pass: process.env.NOREPLY_PASS
        },
        emailConfig: {
            port: parseInt(process.env.REALTEC_EMAIL_PORT),
            host: process.env.REALTEC_EMAIL_HOST,
            service: process.env.REALTEC_EMAIL_SERVICE,
        }
    }
})

export interface EnviromentVariables {
    port: number
    database: null//{}
    realtec: RealtecEnviromentVariables
}

interface RealtecEnviromentVariables {
    rh: {
        email: string
    }
    noReplay: {
        email: string
        pass: string
    }
    emailConfig: {
        port: number
        host: string
    }
}
