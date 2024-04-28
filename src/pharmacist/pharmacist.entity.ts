import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

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
  otp: OtpEntity[];
}

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
  expiration_date: string;

  @ManyToOne(() => UserEntity, (user) => user.otp)
  user: UserEntity;
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
