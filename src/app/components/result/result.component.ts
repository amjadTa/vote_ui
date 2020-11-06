import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateVoterService } from 'src/app/services/update-voter.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input()
  voterData: any;

  @Output()
  showResult = new EventEmitter();
  
  constructor(private updateService: UpdateVoterService) { }

  ngOnInit() {
  }

  okVoting() {
    this.showResult.emit(false);
    this.updateService.updateVoting(this.voterData.id)
      .subscribe(() => {
        alert('עודכן שהצביע');
      },
        error => {
          alert('הנמען עודכן שהצביע מקודם');
        });
  }
  

}
