import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Message } from './message';

export type MessageNode = Mail.Options;

export interface MailDriverContract {
  send(message: MessageNode, config?: any): Promise<any>;
  close(): void | Promise<void>;
  sendConfig(config: any): void;
}

export type PostSentEnvolpeNode = { from: string; to: string[] };

/**
 * Shape of mail response for the smtp driver
 */
export type SmtpMailResponse = SMTPTransport.SentMessageInfo;

/**
 * Shape of the smtp driver
 */
export interface SmtpDriverContract extends MailDriverContract {
  send(message: MessageNode, config?: SmtpConfig): Promise<SmtpMailResponse>;
}

/**
 * Smtp driver config
 */
export type SmtpConfig = SMTPTransport.Options;

export interface MailDrivers {
  smtp: {
    config: SmtpConfig;
  };
}

/**
 * Expected shape of the config accepted by the "mailConfig"
 * method
 */
export type MailConfig = {
  mailers: {
    [name: string]: {
      [K in keyof MailDrivers]: { config: MailDrivers[K]['config'] } & {
        driver: K;
      };
    }[keyof MailDrivers];
  };
};

/**
 * Shape of the callback passed to the `send` method to compose the
 * message
 */
export type MessageComposeCallback = (message: Message) => void | Promise<void>;

export abstract class Mailable {
  build(message: Message) {
    throw new Error('Method not implemented');
  }
}

/**
 * Shape of data view defined on the message
 */
export type MessageContentViewsNode = {
  html?: {
    template: string;
    data?: any;
  };
};
