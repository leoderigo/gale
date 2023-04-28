import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactService {
    protected noReplayEmail: string
    protected rhEmail: string

    constructor(
        configService: ConfigService,
        private emailService: EmailService
    ) {
        this.noReplayEmail = configService.get('realtec.noReply.email')
        this.rhEmail = configService.get('realtec.rh.email')
    }

    async sendCurriculumToRh({ message, name, phone, email, vaga }) {
        const compiled = CONTATO_RH_ESTAGIO_HTML
        .replace('{{message}}', message)
        .replace('{{name}}', name)
        .replace('{{phone}}', phone)
        .replace('{{email}}', email)
        .replace('{{vaga}}', vaga)

        await this.emailService.send({
            html: compiled,
            from: this.noReplayEmail,
            subject: 'Contato de interesse',
            to: this.rhEmail,
            name
        })

        this.emailService.send({
            html: `<span>Nosso RH já está ciente da sua solicitação e responderemos em breve.<span><br/> <span>Obrigado pelo contato!<span><br/><br/><span>Este é um email automático, não responda.<span>`,
            from: `Realtec ${this.noReplayEmail}`,
            subject: 'Já recebemos seus dados',
            to: email,
            name,
        })
    }
}

const CONTATO_RH_ESTAGIO_HTML = `
<html>
    <body>
        <div style="border: 3px solid rgb(0,119,0); border-radius: 6px;">
            <div style="width: 100%; height: 35px; background-color: rgb(0, 119, 0);"></div>
            <div style="padding: 4px 6px; display: flex; flex-direction: column;">
                <div style="display: flex; flex-direction: column; padding: 6px 0px; border-top: 1px solid #afafaf; border-bottom: 1px solid #afafaf">
                    <span><b>Telefone:</b> {{phone}}</span>
                    <span><b>Email:</b> {{email}}</span>
                    <span><b>Nome:</b> {{name}}</span>
                    <span><b>Vaga:</b> {{vaga}}</span>
                </div>

                <span style="padding: 6px 0; border-bottom: 1px solid #afafaf"><b>Mensagem:</b> {{message}}</span>
            </div>
            <div style="background-color: rgb(0, 119, 0); height: 35px; width: 100%;"></div>
        </div>
    </body>
</html>`
