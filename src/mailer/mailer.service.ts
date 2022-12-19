import { Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import * as mjml from 'mjml';
import { join } from 'path';
import {
  Mailable,
  MailDriverContract,
  MessageComposeCallback,
  MessageContentViewsNode,
} from './mailer.interface';
import { Message } from './message';

@Injectable()
export class MailerService {
  constructor(
    @Inject('MAILER_DRIVERS')
    private readonly drivers: Map<string, MailDriverContract>,
  ) {}

  use(driver?: string) {
    if (!this.drivers.has(driver || 'default')) {
      throw new Error(`Driver ${driver} not found`);
    }

    return this.drivers.get(driver || 'default');
  }

  getTemplateDir(template: string) {
    return join(
      __dirname,
      '..',
      '..',
      'views',
      template.replace(/\./g, '/') + '.mjml',
    );
  }

  compile(views: MessageContentViewsNode) {
    const source = readFileSync(
      this.getTemplateDir(views.html?.template),
      'utf-8',
    );

    const template = Handlebars.compile(source)(views.html?.data);

    const { html } = mjml(template);

    return html;
  }

  async send(callback: MessageComposeCallback | Mailable, ...args: any[]) {
    const message = new Message(false);

    if (callback instanceof Function) {
      await callback(message);
    }

    if (callback instanceof Mailable) {
      callback.build(message);
    }

    const jsonMessage = message.toJSON();

    if (jsonMessage.views.html) {
      message.html(this.compile(jsonMessage.views));
    }

    return this.use().send(message.toJSON().message, ...args);
  }

  async close() {
    return this.use().close();
  }
}
