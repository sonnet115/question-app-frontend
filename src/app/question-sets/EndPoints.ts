import {environment} from '../../environments/environment';

export class EndPoints {
  private baseUrl = environment.base_url;

  public readonly createQS = this.baseUrl + '/api/question-set/create';
  public readonly getQS = this.baseUrl + 'api/category/get/parent';
  public readonly updateQS = this.baseUrl + 'api/category/update/';
}
