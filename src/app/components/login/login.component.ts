import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  submitted: boolean = false;
  loginToken: object;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
 * create object of the data and send it to the server
 */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } // end if

    //   const login = this.loginService.login(this.loginForm.value.id, this.loginForm.value.password);
    //     localStorage.setItem('role', login.role);
    //     const role = login.role;
    // if(role == 'update') {
    //   this.router.navigate(['/update']);
    // }
    // else if(role == 'admin' || role == 'phone') {
    //   this.router.navigate(['/phone']);
    // }
    // else {
    //   this.router.navigate(['/']);
    // }


    this.loginService.login(this.loginForm.value.id, this.loginForm.value.password).subscribe(result => {
      localStorage.setItem('role', result.result.role);
      localStorage.setItem('userName', result.result.user_name);
      const role = result.result.role;
      if (role == 'update') {
        this.router.navigate(['/update']);
      }
      else if (role == 'admin' || role == 'phone') {
        this.router.navigate(['/phone']);
      }
      else {
        this.router.navigate(['/']);
      }

    }, error => alert('your details is incorrect'));

  } // end onSubmit()
}
