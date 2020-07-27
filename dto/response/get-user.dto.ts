import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GetUserInterface } from '../../interfaces';
import { GetAdminUserDto } from './get-admin-user.dto';

export class GetUserDto extends GetAdminUserDto implements GetUserInterface {
  @Expose()
  @ApiModelProperty({ type: 'boolean' })
  public readonly isQuestionnaireComplete: boolean;

  @Expose()
  @ApiModelProperty({ type: 'boolean' })
  public readonly isGeneralInfoComplete: boolean;

  @Expose()
  @ApiModelProperty({ type: 'boolean' })
  public readonly isDnaAnalyzeComplete: boolean;

  @Expose()
  @ApiModelProperty({ type: 'boolean' })
  public readonly isDnaFileUploaded: boolean;

  @Expose()
  @ApiModelProperty({ type: 'boolean' })
  public readonly isDnaAnalyzeFailed: boolean;

  @Expose()
  @ApiModelProperty({ type: 'string' })
  public readonly paymentAccount: string;
}
