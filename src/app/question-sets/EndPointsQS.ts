import {environment} from '../../environments/environment';

export class EndPointsQS {
  private baseUrl = environment.base_url;

  public readonly createQS = this.baseUrl + 'api/question-set/create';
  public readonly getQS = this.baseUrl + 'api/question-set/get/5';
}
