import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService } from '../../../services/competition/competition.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Competition } from '../../../models/competition.model';
import { Participant } from '../../../models/participant.model';
import { Poule } from '../../../models/poule.model';
import { UUID } from 'angular2-uuid';
import { ParticipantService } from '../../../services/participant/participant.service';

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

  constructor(private competitionService: CompetitionService, private participantService: ParticipantService, private router: Router, private authService: AuthService) {  }

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
      const data: Array<any> = this.generateCreateData();
      this.competitionService.createCompetition(data[0]).then( competitionId => {
        this.participantService.createParticipant(data[1], competitionId).then(participantId => {
          
        })
      })
    }
  }

  generateCreateData(): Array<any>{
    let competitionData: Array<any> = []
    let participantData: Array<any> = []

    participantData["uid"] = UUID.UUID()
    participantData["userId"] = this.user.uid
    participantData["name"] = this.user.displayName
    participantData["points"] = 0
    
    competitionData["name"] = this.competition.name;
    competitionData["startDate"] = this.competition.startDate;
    competitionData["type"] = this.competition.type;
    competitionData["ownerId"]  = this.competition.ownerId;
    competitionData["maxParticipants"] = this.competition.maxParticipants;
    competitionData["matchTime"] = this.competition.matchTime;
    competitionData["rounds"] = [];

    if(this.competition.type == "poule"){
      const poule: Poule = {
        uid: UUID.UUID(),
        participants: []
      }
      participantData["pouleId"] = poule.uid
      competitionData["poules"] = [poule]
    }
    
    return [competitionData, participantData];
  }

}
