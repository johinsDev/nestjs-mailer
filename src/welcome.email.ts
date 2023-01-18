// import Email from 'emails';
import { Mailable } from './mailer/mailer.interface';
import { Message } from './mailer/message';

// todo support quueue
export class WelcomeEmail extends Mailable {
  constructor(private email: string, private name: string) {
    super();
  }

  build(message: Message): void {
    message
      .to(this.email)
      .subject('Welcome')
      .html(`Hello ${this.name}`)
      .htmlView('welcome', {
        name: this.name,
      });
    // .content(Email());
  }
}
