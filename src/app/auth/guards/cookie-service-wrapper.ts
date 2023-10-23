import { CookieService } from 'ngx-cookie-service';

export class CookieServiceWrapper {
  private static service: CookieService;

  public static setService(service: CookieService) {
    this.service = service;
  }

  public static getService(): CookieService {
    return this.service;
  }
}
