import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { SessionStorageService } from "../services/session-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private ss: SessionStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.ss.getToken();
    req = req.clone({ headers: req.headers.set("Authorization", token) });
    return next.handle(req);
  }
}
