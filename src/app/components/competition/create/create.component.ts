import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService } from '../../../services/competition/competition.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'competition-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  selectedOption: string;
  user: User;

  options = [
    { name: 'Tourney', value: 'tourney' },
    { name: 'Knockout', value: 'knockout' },
    { name: 'Poule', value: 'poule' },
  ];

  constructor(private competitionService: CompetitionService, private router: Router, private authService: AuthService) {  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if(user){
        this.user = user;
      }
      else{
        this.user = null
      }
    });
  }

  createCompetition() {
    if (this.selectedOption) {
      const data: Array<string> = []
      data["type"] = this.selectedOption;
      const participants: Array<string> = [];
      if(this.user != null){
        data["ownerid"]  = this.user.uid;
        participants.push(this.user.uid);
        // add other participants if needed
        data["participants"] = participants;
        this.competitionService.createCompetition(data).then(
          res => {
            this.router.navigate([`/competition/${res}`]);
          }
        );
      }
    }
  }

}
