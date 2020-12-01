import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateVoterService } from 'src/app/services/update-voter.service';

@Component({
  selector: 'app-voting-report',
  templateUrl: './voting-report.component.html',
  styleUrls: ['./voting-report.component.scss']
})
export class VotingReportComponent implements OnInit {

  votingReportForm: FormGroup;
  returnUrl: string;
  submitted: boolean = false;
  searchDetails: object;
  showTablesResult: boolean = false;
  showAddVoter: boolean = false;
  voterData = {
    box: '',
    s: '',
    fName: '',
    lName: '',
    id: ''
  };


  constructor(private formBuilder: FormBuilder, private updateService: UpdateVoterService) { }

  ngOnInit(): void {
    this.votingReportForm = this.formBuilder.group({
      id: [''],
      ballotBoxNumber: [''],
      serieal: ['']
    });
    const calphiNumberForSearch = localStorage.getItem('calphi_number_search');
    if(calphiNumberForSearch) {
      this.votingReportForm.get('ballotBoxNumber').setValue(calphiNumberForSearch);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.showAddVoter = false;

    // stop here if form is invalid
    if (this.votingReportForm.invalid) {
      return;
    } // end if

    if (this.votingReportForm.value.id) {
      this.updateService.searchById(this.votingReportForm.value.id).subscribe(result => {
        this.voterData = {
          box: result.calphi_number,
          s: result.calphi_index,
          fName: result.first_name,
          lName: result.last_name,
          id: result.id
        };
        if (result.id) {
          this.showTablesResult = true;
        }
        else {
          alert('לא נמצא מצביע, תוסיף חדש');
          this.showAddVoter = true;
        }
      }, error => {
        alert('לא נמצא מצביע, תוסיף חדש');
        this.showAddVoter = true;
      });
    }

    else if (this.votingReportForm.value.ballotBoxNumber && this.votingReportForm.value.serieal) {
      localStorage.setItem('calphi_number_search', this.votingReportForm.value.ballotBoxNumber);
      this.updateService.searchByBox(this.votingReportForm.value.ballotBoxNumber, this.votingReportForm.value.serieal).subscribe(result => {
        this.votingReportForm.get('id').setValue(result.id);
        this.voterData = {
          box: result.calphi_number,
          s: result.calphi_index,
          fName: result.first_name,
          lName: result.last_name,
          id: result.id
        };
        if (result.id) {
          this.showTablesResult = true;
          this.showAddVoter = false;
          this.clearSearch();
        }
        else {
          alert('לא נמצא מצביע, תוסיף חדש');
          this.showAddVoter = true;
          this.showTablesResult = false;
          this.clearSearch();
        }
      }, error => {
        alert('לא נמצא מצביע, תוסיף חדש');
        this.showAddVoter = true;
        this.showTablesResult = false;
      });
    }

  } // end onSubmit()

  showResult(event) {
    this.showTablesResult = event;
  }

  showVoter(event) {
    this.showAddVoter = event;
  }

  clearSearch() {
    this.votingReportForm.setValue({
      id: '',
      ballotBoxNumber: localStorage.getItem('calphi_number_search'),
      serieal: ''
    });
  }

}
