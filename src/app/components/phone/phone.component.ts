import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  phoneForm: FormGroup;
  boxes: any;
  circles: any;
  showResult: boolean = false;
  data: any;
  // circles = ['a', 'b']
  constructor(private formBuilder: FormBuilder, private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.phoneForm = this.formBuilder.group({
      traficLight: [''],
      box: [''],
      circle: ['']
    });
    this.getSearchData();
  }

  getSearchData() {
    this.phoneService.clphiNumbers()
    .subscribe(data => {
      this.boxes = data;
    });
    this.phoneService.circles()
    .subscribe(data => {
      this.circles = data;
    });
  }

  onSubmit() {
    const light = this.phoneForm.value.traficLight;
    let box = this.phoneForm.value.box;
    let circle = this.phoneForm.value.circle;
    if(box == 'כל הקלפיות') { box = ''; }
    if(circle == 'ללא סינון מעגלים') { circle = 'No'; }
    this.phoneService.list(box, circle, light)
    .subscribe(data => {
      if(data.length > 0) {
        this.data = data;
        for(let i = 0; i < this.data.length; i++) {
          this.data[i].phone = `<a href='tel:${this.data[i].phone}'>${this.data[i].phone}</a>`;
        }
        this.showResult = true;
        this.clearSearch();
      }
      else {
        this.showResult = false;
        alert('אין תוצאות');
      }
    });

  } // end onSubmit()

  clearSearch() {
    this.phoneForm.setValue({
      traficLight: '',
      box: '',
      circle: ''
    });
  }

  onChangeLight(value) {
    if (value == 'נקה בחירה') {
      this.phoneForm.get('traficLight').setValue('');
    }
  }

  onChangeBox(value) {
    if (value == 'נקה בחירה') {
      this.phoneForm.get('box').setValue('');
    }
  }

  onChangeCircle(value) {
    if (value == 'נקה בחירה') {
      this.phoneForm.get('circle').setValue('');
    }
  }

}
