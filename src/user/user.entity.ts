// user.entity.ts
import { OtpEntity } from 'src/pharmacist/pharmacist.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => OtpEntity, (otp) => otp.user)
  otps: OtpEntity[];
  otp: any;

  // Generate OTP
  generateOTP(): string {
    const otp = Math.random().toString().slice(2, 8); // 6-digit OTP
    return otp;
  }

  // Validate OTP
  validateOTP(otp: string): boolean {
    const latestOtp = this.otps[this.otps.length - 1];
    if (!latestOtp) {
      return false; // No OTPs associated with user
    }
    const currentTime = new Date();
    if (latestOtp.expiration_date && latestOtp.expiration_date < currentTime) {
      return false; // OTP has expired
    }
    return latestOtp.otp === otp;
  }
}
