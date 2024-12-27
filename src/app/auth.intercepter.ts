import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        let authReq = req;
    
        if (token) {
          // Clone the request and add the Authorization header with the token
          authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            }
          });
        }
    
        return next.handle(authReq);
      }
}
