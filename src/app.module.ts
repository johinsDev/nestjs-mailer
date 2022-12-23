import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      mailers: {
        default: {
          driver: 'smtp',
          config: {
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
              user: '5f9a58cee8546f',
              pass: 'ce3f98bfc8d131',
            },
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
