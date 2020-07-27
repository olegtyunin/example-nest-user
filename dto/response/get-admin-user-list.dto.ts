import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginatedResponseDto } from '../../../common/dto';
import { GetAdminUserDto } from './get-admin-user.dto';

export class GetAdminUserListDto extends PaginatedResponseDto<GetAdminUserDto> {
  @Expose()
  @Type(() => GetAdminUserDto)
  @ApiModelProperty({ type: GetAdminUserDto, isArray: true })
  public readonly data: GetAdminUserDto[];
}
