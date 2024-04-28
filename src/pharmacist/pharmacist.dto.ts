// prescription.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  DoctorEntity,
  pharmacistEntity,
  UserEntity,
} from './pharmacist.entity';

export class PrescriptionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  appointment_date: string;

  @ApiProperty()
  appointment_time: string;

  @ApiProperty({ nullable: true })
  disease: string;

  @ApiProperty({ nullable: true })
  responseTime: string;

  @ApiProperty({ nullable: true })
  scheduledTime: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: () => UserEntity })
  patient: UserEntity;

  @ApiProperty({ type: () => pharmacistEntity })
  pharmacists: pharmacistEntity;

  @ApiProperty({ type: () => DoctorEntity })
  doctor: DoctorEntity;
}
