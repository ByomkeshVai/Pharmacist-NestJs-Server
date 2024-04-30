// otp.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { EmailService } from 'src/helpers/sendMailer.service';
import { OtpEntity } from 'src/pharmacist/pharmacist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity])],
  controllers: [OtpController],
  providers: [OtpService, EmailService], // Provide EmailService
})
export class OtpModule {}
