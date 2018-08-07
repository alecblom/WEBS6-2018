import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService } from '../../../services/competition/competition.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Competition } from '../../../models/competition.model';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'competition-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CompetitionCreateComponent implements OnInit {

  selectedType: string;
  user: User;
  competition = new Competition();

  types = [
    { name: 'Tourney', value: 'tourney' },
    { name: 'Knockout', value: 'knockout' },
    { name: 'Poule', value: 'poule' },
  ];

  constructor(private competitionService: CompetitionService, private router: Router, private authService: AuthService) {  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if(user){
        this.user = user
        this.competition.ownerId = user.uid
      }
      else{
        this.user = null
      }
    });
  }

  createCompetition(form: NgForm) {
    if (this.user && form.valid) {
      const data: Array<any> = this.generateCompetitionData();
      this.competitionService.createCompetition(data).then(
        res => {
          this.router.navigate([`/competition/${res}`]);
        }
      );
    }
  }

  generateCompetitionData(): Array<any>{
    const data: Array<any> = []
    let participants: Array<User> = [];

    participants.push(this.user);
    console.log(this.competition);
    data["name"] = this.competition.name;
    data["startDate"] = this.competition.startDate;
    data["type"] = this.competition.type;
    data["ownerId"]  = this.competition.ownerId;
    data["maxParticipants"] = this.competition.maxParticipants;
    data["matchTime"] = this.competition.matchTime;
    data["participants"] = participants;
    data["matches"] = [];
    
    return data;
  }

}
