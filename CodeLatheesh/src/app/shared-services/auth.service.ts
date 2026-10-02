import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { retry, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private authUrl = `${environment.apiBaseUrl}/api/Auth`;
  constructor(private http: HttpClient) {}



  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, {
      username,
      password
    })
    .pipe(
      // 1. Wait up to 45 seconds for Azure's cold start
      timeout(45000),
      // 2. Automatically retry once if the first request fails due to server spin-up delay
      retry(1)
    );
  }
register(username: string, password: string,firstname:string,lastname:string,email:string) {
    return this.http.post<{ token: string }>(`${this.authUrl}/register`, {
      username,
      password,
      firstname,
      lastname,
      email
    });
  }
  saveToken(response: any) {
    // Save data to localStorage
    localStorage.setItem('token', response.userDetailsDto.token);
    localStorage.setItem('username', response.userDetailsDto.username);
    localStorage.setItem('firstName', response.userDetailsDto.firstName);
    localStorage.setItem('lastName', response.userDetailsDto.lastName);
    localStorage.setItem('email', response.userDetailsDto.email);
    localStorage.setItem('userid', response.userDetailsDto.userId);

    // Optionally store whole object
    localStorage.setItem('user', JSON.stringify(response));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
