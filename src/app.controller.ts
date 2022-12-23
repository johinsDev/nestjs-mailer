import { Controller, Get } from '@nestjs/common';
import { DateTime } from 'luxon';
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

    await this.mailer.later(
      DateTime.local().plus({ seconds: 10 }),
      new WelcomeEmail('johinsdev@gmail.com', 'John'),
    );

    await this.mailer.queue(new WelcomeEmail('johinsdev@gmail.com', 'John'));
  }
}
