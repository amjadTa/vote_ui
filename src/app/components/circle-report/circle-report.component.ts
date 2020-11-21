import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-circle-report',
  templateUrl: './circle-report.component.html',
  styleUrls: ['./circle-report.component.scss']
})
export class CircleReportComponent implements OnInit {

  settings = {
    mode: 'external',
    actions: {
      add: false,
      delete: false,
      edit: false
    },
    edit: {
      editButtonContent: '<span>לחץ אישור יצירת קשר</span>',
    },
    columns: {
      total_2020_lyn_plus_pref: {
        title: 'מספר המצביעים ללין או נוטים',
      },
      total_did_votes: {
        title: 'מספר שהצביעו במעגל',
      },
      count_total_circle: {
        title: 'כמות מצביעים במעגל',
      },
      circle_1: {
        title: 'מעגל',
      },
    },
  };

  data: any;
  source: LocalDataSource;

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.phoneService.getCirclesReport()
    .subscribe(data => {
      this.data = data;
      this.source = new LocalDataSource(this.data);
    },
      error => {
        alert('קיימת שגיאה, נסה שוב מאוחר יותר!');
      });
  }

}
