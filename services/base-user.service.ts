import { Repository } from 'typeorm';
import { ValidationConstants } from '../../common/constants';
import { ValidationErrorCodes } from '../../common/enums/errors';
import { PaginatedResponseInterface, PaginationQueryInterface } from '../../common/interfaces';
import { RequestValidationError } from '../../common/models';
import { getNormalizedPaginationData } from '../../common/utils';
import { PasswordService } from '../../core/services';
import { BaseUserModel } from '../entities/base-user.model';
import { CreateBaseUserInterface, UpdateAdminInterface } from '../interfaces';

export abstract class BaseUserService<Model extends BaseUserModel> {
  constructor(
    protected readonly userRepository: Repository<Model>,
    protected readonly passwordService: PasswordService,
  ) {
  }

  public async checkIsUserExistsByEmail(email: string): Promise<boolean> {
    const usersCount = await this.userRepository.count({ where: { email } });
    return usersCount > 0;
  }

  public async createNewUser(data: CreateBaseUserInterface): Promise<Model> {
    return this.userRepository.save(data as any);
  }

  public async updateUserPassword(id: number, password: string): Promise<void> {
    password = this.preparePassword(password);
    const passwordHash = await this.passwordService.generatePassword(password);
    await this.updateUserById(id, { passwordHash });
  }

  public async updateUserById(id: number, dataToUpdate: UpdateAdminInterface): Promise<Model> {
    await this.userRepository.update(id, dataToUpdate as any);
    return this.getUserById(id);
  }

  public async getUserById(id: number): Promise<Model> {
    return this.userRepository.findOne({ where: { id } });
  }

  public async getUserByEmail(email: string): Promise<Model> {
    return this.userRepository.findOne({ where: { email } });
  }

  public async getUserListWithPagination(query: PaginationQueryInterface): Promise<PaginatedResponseInterface<Model>> {
    const { limit, page } = getNormalizedPaginationData(query);
    const totalCount = await this.userRepository.count();
    const data = await this.userRepository.find({ skip: page * limit, take: limit });

    return {
      data,
      itemsPerPage: limit,
      totalCount,
    };
  }

  public preparePassword(password: string): string {
    password = password.trim();
    if (password.length < ValidationConstants.MIN_PASSWORD_LENGTH) {
      throw new RequestValidationError([{
        field: 'password',
        messageCode: ValidationErrorCodes.MIN_LENGTH,
      }]);
    }
    return password;
  }
}
