import { Column, Entity } from 'typeorm';
import { BaseUserModel } from './base-user.model';

@Entity({ name: 'users' })
export class User extends BaseUserModel {
  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  public readonly email: string;

  @Column({ name: 'password_hash', type: 'varchar', nullable: true })
  public passwordHash?: string;

  @Column({ name: 'is_email_confirmed', type: 'boolean', nullable: false, default: false })
  public isEmailConfirmed: boolean;

  @Column({ name: 'is_questionnaire_complete', type: 'boolean', nullable: false, default: false })
  public isQuestionnaireComplete: boolean;

  @Column({ name: 'is_general_info_complete', type: 'boolean', nullable: false, default: false })
  public isGeneralInfoComplete: boolean;

  @Column({ name: 'is_dna_analyze_complete', type: 'boolean', nullable: false, default: false })
  public isDnaAnalyzeComplete: boolean;

  @Column({ name: 'is_dna_analyze_failed', type: 'boolean', nullable: false, default: false })
  public isDnaAnalyzeFailed: boolean;

  @Column({ name: 'is_dna_file_uploaded', type: 'boolean', nullable: false, default: false })
  public isDnaFileUploaded: boolean;

  @Column({ name: 'payment_account', type: 'varchar', nullable: true })
  public paymentAccount?: string;

  @Column({ name: 'dna_file_url', type: 'varchar', nullable: true })
  public dnaFileUrl?: string;
}
