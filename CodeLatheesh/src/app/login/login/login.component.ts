import { Component } from '@angular/core';
import { AuthService } from '../../shared-services/auth.service';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        alert('Login Successful!');
        this.router.navigateByUrl('/admin/Home'); // after login redirect
      },
      error: () => {
        alert('Login Failed!');
      }
    });
  }
}
