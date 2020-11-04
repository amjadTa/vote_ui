import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateVoterService } from 'src/app/services/update-voter.service';

@Component({
  selector: 'app-create-voter',
  templateUrl: './create-voter.component.html',
  styleUrls: ['./create-voter.component.scss']
})
export class CreateVoterComponent implements OnInit {

  newVoterForm: FormGroup;
  @Output()
  showVoter = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder, private updateService: UpdateVoterService) { }

  ngOnInit(): void {
    this.newVoterForm = this.formBuilder.group({
      id: [''],
      ballotBoxNumber: [''],
      serieal: [''],
      first_name: [''],
      last_name: [''],
      phone: [''],
      support: ['']
    });
  }

  onSubmit() {

    const data = {
      box_number: this.newVoterForm.value.ballotBoxNumber,
      box_index: this.newVoterForm.value.serieal,
      first_name: this.newVoterForm.value.first_name,
      last_name: this.newVoterForm.value.last_name,
      id: this.newVoterForm.value.id,
      phone: this.newVoterForm.value.phone,
      support: this.newVoterForm.value.support,
      user: localStorage.getItem('userName')
    }
      this.updateService.addVoteer(data).subscribe(result => {
        alert('מצביע נוסף');
      }, error => {
        alert('לא נמצא מצביע, תוסיף חדש');
      });
      this.showVoter.emit(false);

  } // end onSubmit()

}
