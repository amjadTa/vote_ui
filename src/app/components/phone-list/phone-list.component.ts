import { Component, Input, OnInit } from '@angular/core';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {

  @Input()
  data: any;

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
  }

  getPhone(index: any) {
    console.log(index)
    this.phoneService.getPhone(this.data[index].id)
    .subscribe(data => {
      alert('עודכן בהצלחה');
      this.data.splice(index, 1);
    },
      error => {
        alert('קיימת שגיאה, נסה שוב מאוחר יותר!');
      });
  }
}
