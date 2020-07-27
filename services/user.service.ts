import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'class-validator';
import { Repository } from 'typeorm';
import { PasswordService } from '../../core/services';
import { User, UserGeneralInfo } from '../entities';
import { Ethnicity } from '../enums';
import { UpdateUserInterface, UserGeneralInfoInterface } from '../interfaces';
import { BaseUserService } from './base-user.service';

@Injectable()
export class UserService extends BaseUserService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    @InjectRepository(UserGeneralInfo)
    private readonly userGeneralInfoRepository: Repository<UserGeneralInfo>,
    protected readonly passwordService: PasswordService,
  ) {
    super(userRepository, passwordService);
  }

  public async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  public async getUserByIdGeneralInfo(userId: number): Promise<UserGeneralInfo> {
    return this.userGeneralInfoRepository.findOne({ userId });
  }

  public async updateUserById(id: number, dataToUpdate: UpdateUserInterface): Promise<User> {
    if (dataToUpdate.dnaFileUrl) {
      await this.userRepository.update({ id }, { ...dataToUpdate, isDnaFileUploaded: true });
      return this.getUserById(id);
    } else {
      return super.updateUserById(id, dataToUpdate);
    }
  }

  public async setUserGeneralInfo(userId: number, data: UserGeneralInfoInterface): Promise<void> {
    if (data.ethnicity === Ethnicity.OTHER && data.otherEthnicity.length === 0) {
      throw new ValidationError();
    }
    const userGeneralInfo = await this.userGeneralInfoRepository.findOne({ userId });
    if (userGeneralInfo) {
      await this.userGeneralInfoRepository.update({ id: userGeneralInfo.id }, data);
    } else {
      await this.userGeneralInfoRepository.save(this.userGeneralInfoRepository.create({
        ...data,
        userId,
      }));
    }
    await this.userRepository.update({ id: userId }, { isGeneralInfoComplete: true });
  }

  public async setPersonalityTest(userId: number): Promise<void> {
    await this.userRepository.update({ id: userId }, { isQuestionnaireComplete: true });
  }

  public async setDnaResult(userId: number): Promise<void> {
    await this.userRepository.update({ id: userId }, { isDnaAnalyzeComplete: true, isDnaAnalyzeFailed: false });
  }

  public async setDnaError(userId: number): Promise<void> {
    await this.userRepository.update({ id: userId }, { isDnaAnalyzeFailed: true, isDnaAnalyzeComplete: false });
  }

  public async setPaymentSuccess(userId: number, paymentAccount: string): Promise<void> {
    await this.userRepository.update({ id: userId }, { paymentAccount });
  }
}
