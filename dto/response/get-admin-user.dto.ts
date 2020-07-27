import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseEntityLikeDto } from '../../../common/dto';

export class GetAdminUserDto extends BaseEntityLikeDto {
  @Expose()
  @ApiModelProperty({ example: 'mail@example.com' })
  public readonly email: string;

  @Expose()
  @ApiModelProperty({ type: 'boolean' })
  public readonly isEmailConfirmed: boolean;
}
