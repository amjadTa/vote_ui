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
  boxes: any;// = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160];
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
    const box = this.phoneForm.value.box;
    const circle = this.phoneForm.value.circle;
    this.phoneService.list(box, circle, light)
    .subscribe(data => {
      if(data.length > 0) {
        this.data = data;
        this.showResult = true;
        this.clearSearch();
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
