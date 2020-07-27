import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginatedResponseDto } from '../../../common/dto';
import { GetUserDto } from './get-user.dto';

export class GetUserListDto extends PaginatedResponseDto<GetUserDto> {
  @Expose()
  @Type(() => GetUserDto)
  @ApiModelProperty({ type: GetUserDto, isArray: true })
  public readonly data: GetUserDto[];
}
