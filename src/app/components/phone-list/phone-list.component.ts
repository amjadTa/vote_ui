import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {

  @Input()
  data: any;

settings = {
  mode: 'external',
  actions: {
    add: false,
    delete: false
  },
  edit: {
    editButtonContent: '<span>לחץ אישור יצירת קשר</span>',
  },
  columns: {
    light: {
      title: 'רמזור',
    },
    phone: {
      title: 'מספר טלפון',
    },
    last_name: {
      title: 'שם משפחה',
    },
    first_name: {
      title: 'שם פרטי',
    },
  },
};

source: LocalDataSource;

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.source = new LocalDataSource(this.data);
  }

  getPhone(index: any) {
    this.phoneService.getPhone(this.data[index].id)
    .subscribe(data => {
      alert('עודכן בהצלחה');
      this.data.splice(index, 1);
    },
      error => {
        alert('קיימת שגיאה, נסה שוב מאוחר יותר!');
      });
  }

  onEdit(event: any) {
    console.log(event)
    this.phoneService.getPhone(event.data.id)
    .subscribe(data => {
      alert('עודכן בהצלחה');
      this.data.splice(event.index, 1);
      this.source = new LocalDataSource(this.data);
    },
      error => {
        alert('קיימת שגיאה, נסה שוב מאוחר יותר!');
      });
  }
}
