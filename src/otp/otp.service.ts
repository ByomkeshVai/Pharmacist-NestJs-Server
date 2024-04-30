// otp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/helpers/sendMailer.service';
import { OtpEntity } from 'src/pharmacist/pharmacist.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    private readonly emailService: EmailService,
  ) {}

  async generateOtp(user: UserEntity): Promise<string> {
    const otp = user.generateOTP();
    const newOtp = new OtpEntity();
    newOtp.otp = otp;
    newOtp.user = user;
    newOtp.setExpirationDate();
    await this.otpRepository.save(newOtp);

    // Send OTP via email
    await this.emailService.sendOtpEmail(user.email, otp);

    return otp;
  }

  async validateOtp(user: UserEntity, otp: string): Promise<boolean> {
    return user.validateOTP(otp);
  }
}
