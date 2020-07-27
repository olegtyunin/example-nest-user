import { GetAdminUserInterface } from './get-admin-user.interface';

export interface GetUserInterface extends GetAdminUserInterface {
  readonly isQuestionnaireComplete: boolean;
  readonly isGeneralInfoComplete: boolean;
  readonly isDnaAnalyzeComplete: boolean;
  readonly isDnaAnalyzeFailed: boolean;
  readonly isDnaFileUploaded: boolean;
  readonly paymentAccount?: string;
}
