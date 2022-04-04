import {environment} from '../../environments/environment';

export class EndPointsQ {
  private baseUrl = environment.base_url;

  public readonly createQ = this.baseUrl + 'api/question/create';
  public readonly getQ = this.baseUrl + 'api/question/get';

}
