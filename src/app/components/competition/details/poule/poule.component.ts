import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { CompetitionService } from '../../../../services/competition/competition.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { Competition } from '../../../../models/competition.model';
import { PouleCompetition } from '../../../../models/poulecompetition.model';

@Component({
  selector: 'details-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss']
})
export class DetailsPouleComponent implements OnInit {

  private isOwner: boolean = false;
  public user: User;
  private competition: PouleCompetition;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user
      this.competitionService.getCompetition(this.route.snapshot.paramMap.get('id')).then(competition => {
          this.competition = competition
          if(this.user.uid == this.competition.ownerId){
            this.isOwner = true;
          }
      });
    })
  }

  addParticipantToPoule(participant: any, poule: any){
    console.log(participant)
    console.log(poule)
    poule.participants.push(participant)
    this.competition.unassignedParticipants.pop()
    console.log(this.competition)
    console.log(participant)
    console.log(poule)
  }

  addPoule(){
    var pouleNumber = this.competition.poules.length + 1
    var poule = {
      name: "Poule " + pouleNumber,
      participants: []
    }
    this.competition.poules.push(poule)
    console.log(this.competition)
  }

}
