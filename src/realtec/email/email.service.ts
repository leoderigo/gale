import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'

import * as nodemailer from 'nodemailer'

import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ExpectedError } from 'src/shared/classes/ExpectedError';

@Injectable()
export class EmailService {
    protected noReplayEmail: string
    protected transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    constructor(
        configService: ConfigService
    ) {
        const { email:noReplyEmail, pass:noReplyPass } = configService.get('realtec.noReply')
        const { port, host, service } = configService.get('realtec.emailConfig')
        this.noReplayEmail = noReplyEmail
        console.log('data', port, host, noReplyEmail)
        this.transporter = nodemailer.createTransport({
            service,
            host,
            port,
            auth: {
                user: noReplyEmail,
                pass: noReplyPass
            }
        })
    }

    async send(message: { from: string, html: string, name: string, subject: string, to: string }) {
        const mailOptions = {
            ...message,
            to: message.name ? `${message.name} ${message.to}` : message.to,
            envelope: {
                from: this.noReplayEmail,
                to: message.to
            }
        }

        const sended = await this.transporter.sendMail(mailOptions)
        .catch(err => {
            console.log(err)
            throw new ExpectedError({ code: HttpStatus.INTERNAL_SERVER_ERROR, log: 'Não foi possível enviar o email', error: err })
        })

        if (!sended.accepted.find(el => el === message.to)) {
            throw new ExpectedError({ code: HttpStatus.INTERNAL_SERVER_ERROR, log: 'Email não aceito' })
        }
    }
}
