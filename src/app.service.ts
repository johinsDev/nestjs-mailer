import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    // config: SMTPConnection.Options
    if (!nodemailer) {
      throw new Error('Nodemailer is not installed');
    }

    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '5f9a58cee8546f',
        pass: 'ce3f98bfc8d131',
      },
    });
  }

  /**
   * Send message
   */
  public async send(message: Mail.Options): Promise<any> {
    if (!this.transporter) {
      throw new Error(
        'Driver transport has been closed and cannot be used for sending emails',
      );
    }

    return this.transporter.sendMail(message);
  }

  /**
   * Close transporter connection, helpful when using connections pool
   */
  public async close() {
    this.transporter.close();
    this.transporter = null;
  }
}
