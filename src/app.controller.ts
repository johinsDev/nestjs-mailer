import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer/mailer.service';
import { WelcomeEmail } from './welcome.email';

//

@Controller()
export class AppController {
  constructor(private readonly mailer: MailerService) {}

  @Get()
  async sendEmail() {
    // await this.mailer.send((message) => {
    //   message.to('johinsdev@gmail.com').html('Hello World').subject('Hello');
    // });

    await this.mailer.send(new WelcomeEmail('johinsdev@gmail.com', 'John'));
  }
}
