import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, concatMap, forkJoin, combineLatest, of } from 'rxjs';
import { catchError, map, retry, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  private tokenJWT = '';

  // Call localhost to get background image
  getBackgroundImage() {
    return this.http.get('http://localhost:3003/image');
  }


  // Autenticate and call first Users
  authGetUsers(): any {
    let headers = {
			'x-app-id': 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCh7uxHjWd1CyRgPD4XHcIPKiDb'
		};
    return this.http.post('https://challenge-fielo.herokuapp.com/auth', { headers: headers}).pipe(

      concatMap((res: any) => {
      this.tokenJWT = res.token;
      let headers2 = {
        'x-access-token': this.tokenJWT
      }
      return this.http.get('https://challenge-fielo.herokuapp.com/users', { headers: headers2})
    }))
  }

  // Call each user to get more info
  getFullUser(id: string) {
    let headers = {
      'x-access-token': this.tokenJWT
    }
    return this.http.get('https://challenge-fielo.herokuapp.com/users/'+id, { headers: headers})
  }

  // Call each user to get all details
  getUserDetails(id: string, programId: string, levelId: string) {
    let headers = {
      'x-access-token': this.tokenJWT
    }
    return forkJoin([
      this.http.get('https://challenge-fielo.herokuapp.com/users/'+id+'/activities', { headers: headers}),
      this.http.get('https://challenge-fielo.herokuapp.com/programs/'+programId, { headers: headers}),
      this.http.get('https://challenge-fielo.herokuapp.com/levels/'+levelId, { headers: headers})
    ])
  }
}
