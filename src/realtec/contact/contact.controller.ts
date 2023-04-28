import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { RhCurriculumBody } from './interfaces/routes.interfaces';
import { ExpectedError } from '../../shared/classes/ExpectedError';
import { ContactService } from './contact.service';

@Controller('realtec/contact')
export class ContactController {
    constructor(
        private contactService: ContactService
    ) {

    }

    @Post('/rh/curriculum')
    async sendCurriculumToRh(
        @Body() body: RhCurriculumBody
    ) {
        try {
            const { email, message, name, phone, vaga } = body
            await this.contactService.sendCurriculumToRh({ email, message, name, phone, vaga })
        } catch(err) {
            if (err instanceof ExpectedError) {
                throw new HttpException(err.error, err.code)
            }

            throw new HttpException('Tivemos um erro inesperado', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
