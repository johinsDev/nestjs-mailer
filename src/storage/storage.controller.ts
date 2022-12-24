import { Controller, Get, Logger } from '@nestjs/common';

interface MailManagerContract {
  send(): string;
}

abstract class BaseMailer {
  static mail: MailManagerContract;

  public mail = (this.constructor as typeof BaseMailer).mail;

  send() {
    this.prepare();
    return this.mail.send();
  }

  /**
   * Prepare mail message
   */
  public abstract prepare(): Promise<any> | any;
}

class WelcomeEmail extends BaseMailer {
  private logger = new Logger(WelcomeEmail.name);

  public prepare() {
    console.log('Preparing welcome email');
    return 'Welcome email';
  }
}

class MailManager implements MailManagerContract {
  public send() {
    console.log('Sending mail');

    return 'Mail sent from MailManager';
  }
}

BaseMailer.mail = new MailManager();

@Controller('storage')
export class StorageController {
  @Get('/')
  list() {
    new WelcomeEmail().send();

    return 'list';
  }
}
