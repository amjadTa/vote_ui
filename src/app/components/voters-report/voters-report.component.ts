import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-voters-report',
  templateUrl: './voters-report.component.html',
  styleUrls: ['./voters-report.component.scss']
})
export class VotersReportComponent implements OnInit {

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
      count_2020_lyn_plus_pref_precentage: {
        title: 'אחוז המצביעים ללין או נוטים',
      },
      total_2020_lyn_plus_pref: {
        title: 'מספר המצביעים ללין או נוטים',
      },
      total_did_votes: {
        title: 'מספר שהצביעו בקלפי',
      },
      count_total_voters: {
        title: 'כמות מצביעים בקלפי',
      },
      calphi_number: {
        title: 'מספר קלפי',
      },
    },
  };

  data: any;
  source: LocalDataSource;

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.phoneService.getVotersReport()
    .subscribe(data => {
      this.data = data;
      this.source = new LocalDataSource(this.data);
    },
      error => {
        alert('קיימת שגיאה, נסה שוב מאוחר יותר!');
      });
  }

}
