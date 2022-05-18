import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/authentication/auth.service';

// HttpInterceptor prerusi kazde jedno http volanie
// vie pracovat s este neodoslanym requestom a upravit ho (nas pripad)
// alebo s prijatym responseom predtym ako sa dostaneme k datam klasickym sposobom
// (to sa pouziva napriklad pri error interceptoroch, kedy sa chybove hlasenie spracuje globalne a skor ako pride k nasmu .subscribe())

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // tu je potrebne pridat url, ktore je treba vylucit - aby im nepridaval bearer token (prihlasenie, registracia)
    // v pripade ak bude stringov viac, tak by som navrhla ich ulozit do separatnych premennych
    // const prihlasenie = 'api/authentication';
    // const registracia = 'api/registration';
    // a potom v podmienke pouzila
    // if (req.url.search(prihlasenie) === -1 && req.url.search(registracia) === -1) { ... }

    const exclude = 'api/authentication';
    if (req.url.search(exclude) === -1) {
      req = req.clone({ headers: req.headers.append('Authorization', this.auth.getToken()) });
    }

    return next.handle(req);
  }
}
