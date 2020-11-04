import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  showUpdatePassword: boolean = false;
  showNewUser: boolean = false;
  updatePasswordForm: FormGroup;
  NewUserForm: FormGroup;
  users: any;
  private index: any;

  constructor(private formBuilder: FormBuilder, private userService: LoginService) { }

  ngOnInit(): void {
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });

    this.NewUserForm = this.formBuilder.group({
      password: ['', Validators.required],
      id: ['', Validators.required],
      userName: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers()
    .subscribe(data => {
      this.users = data;
    });
  }

  updatePssword(index) {
    this.index = index;
    this.showUpdatePassword = true;
  }

  addNewUser() {
    this.showNewUser = true;
    this.showUpdatePassword = false;
  }

  onSubmit() {
    this.showUpdatePassword = false;
    this.showNewUser = false;
    this.userService.updatePassword(this.users[this.index].id, this.updatePasswordForm.value.password)
    .subscribe(() => {
      alert('סיסמא עודכנה בהצלחה');
    },
    error => {
      alert('קיימת שגיאה, נסה שוב מאוחר יותר!');
    });
  } // end onSubmit()

  createNewUser() {
    this.showUpdatePassword = false;
    this.showNewUser = false;
    const item = {
      user_name: this.NewUserForm.value.userName,
      role: this.NewUserForm.value.role,
      password: this.NewUserForm.value.password,
      id: this.NewUserForm.value.id
    };
    this.userService.createNewUser(item)
    .subscribe(() => {
      alert('משתמש נוצר בהצלחה');
    },
    error => {
      alert('קיימת שגיאה, נסה שוב מאוחר יותר!');
    });
  }

}
