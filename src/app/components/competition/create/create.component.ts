import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService } from '../../../services/competition/competition.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'competition-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CompetitionCreateComponent implements OnInit {

  selectedType: string;
  user: User;

  types = [
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

  createCompetition(form: NgForm) {
    if (this.user) {
      const data: Array<any> = this.generateCompetitionData(form);
      this.competitionService.createCompetition(data).then(
        res => {
          this.router.navigate([`/competition/${res}`]);
        }
      );
    }
  }

  generateCompetitionData(form: NgForm): Array<any>{
    const data: Array<any> = []
    let participants: Array<User> = [];

    participants.push(this.user);
    console.log(form.value);
    data["name"] = form.value.name;
    data["startDate"] = form.value.startDate;
    data["type"] = form.value.type;
    data["ownerId"]  = form.value.ownerId;
    data["maxParticipants"] = form.value.maxParticipants;
    data["matchTime"] = form.value.matchTime;
    data["participants"] = participants;
    data["matches"] = [];
    
    return data;
  }

}
