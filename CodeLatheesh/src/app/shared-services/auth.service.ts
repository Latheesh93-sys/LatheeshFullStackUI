import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>('https://localhost:7004/api/Auth/login', {
      username,
      password
    });
  }
register(username: string, password: string,firstname:string,lastname:string,email:string) {
    return this.http.post<{ token: string }>('https://localhost:7004/api/Auth/register', {
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
