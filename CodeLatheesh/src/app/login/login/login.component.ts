import { Component } from '@angular/core';
import { AuthService } from '../../shared-services/auth.service';
import {Router} from '@angular/router';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private toastr:ToastrService) {}

  onLogin() {
  this.auth.login(this.username, this.password).subscribe({
    next: (res) => {
      this.auth.saveToken(res);
      this.toastr.success('Login Successful');
      this.router.navigateByUrl('/admin/Home');
    },
    error: () => {
      this.toastr.error('Invalid Username or Password','Login Failed');
    }
  });
}
}
