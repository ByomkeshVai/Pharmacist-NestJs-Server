import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { UserService } from 'src/user/user.service';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OtpService,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  async generateOtp(@Body() { email }: { email: string }) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const otp = await this.otpService.generateOtp(user);
    return { message: 'OTP generated successfully', otp };
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validateOtp(@Body() { email, otp }: { email: string; otp: string }) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isValid = await this.otpService.validateOtp(user, otp);
    if (!isValid) {
      throw new BadRequestException('Invalid OTP');
    }
    return { message: 'OTP is valid' };
  }
}
