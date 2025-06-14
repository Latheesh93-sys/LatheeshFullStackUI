import { Component } from '@angular/core';
import { AuthService } from '../../shared-services/auth.service';
import {Router} from '@angular/router';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  firstname='';
  lastname='';
  email='';
  constructor(private auth: AuthService, private router: Router) {}
onRegister() {
    this.auth.register(this.username, this.password,this.firstname,this.lastname,this.email).subscribe({
      next: (res) => {
        this.auth.saveToken(res);
        alert('Registration Successful!');
        this.router.navigateByUrl('/admin/Home'); // after login redirect
      },
      error: () => {
        alert('Registration Failed!');
      }
    });
  }
}
