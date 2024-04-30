import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('pharmacist')
export class pharmacistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  gender: string;

  @Column()
  image: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}

@Entity('otp')
export class OtpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  otp: string;

  @Column({ nullable: true })
  expiration_date: Date;

  @ManyToOne(() => UserEntity, (user) => user.otps)
  user: UserEntity;

  // Set expiration date for OTP (default is 5 minutes)
  setExpirationDate(expirationInMinutes: number = 5): void {
    const currentTime = new Date();
    this.expiration_date = new Date(
      currentTime.getTime() + expirationInMinutes * 60000,
    );
  }
}

@Entity('doctor')
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column()
  degree: string;

  @Column()
  experience: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  image: string;

  @ManyToOne(() => UserEntity) // Define the user relationship
  @JoinColumn() // Add join column
  user: UserEntity; // Define the user property
}

@Entity('prescription')
export class PrescriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appointment_date: string;

  @Column()
  appointment_time: string;

  @Column({ nullable: true })
  disease: string;

  @Column({ nullable: true })
  responseTime: string;

  @Column({ nullable: true })
  scheduledTime: string;

  @Column()
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  patient: UserEntity;

  // @ManyToOne(() => UserEntity, (user) => user.appointments)
  // @JoinColumn({ name: "doctor_id" })
  // doctor: UserEntity;
  @ManyToOne(() => pharmacistEntity, (pharmacist) => pharmacist.id)
  @JoinColumn({ name: 'pharmacist_id' })
  pharmacist: pharmacistEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.id)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}
