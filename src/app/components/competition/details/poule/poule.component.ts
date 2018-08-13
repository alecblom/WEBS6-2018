import { Component, OnInit, Input } from '@angular/core';
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

  private isOwner: boolean;
  public user: User;
  @Input() competition: PouleCompetition;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user
      this.competitionService.getCompetition(this.route.snapshot.paramMap.get('id')).subscribe(competition => {
          this.competition = competition
          if(this.user.uid == this.competition.ownerId){
            this.isOwner = true;
          }
          else{
            this.isOwner = false;
          }
      });
    })
  }

  addParticipantToCompetition(participant: any){
    var poule = this.competition.poules[this.competition.poules.length - 1]
    if(poule.length > 3){
      poule = this.addPoule();
    }
    poule.participants.push(participant)
  }

  addPoule(): any{
    var pouleNumber = this.competition.poules.length + 1
    var poule = {
      name: "Poule " + pouleNumber,
      participants: []
    }
    this.competition.poules.push(poule)
    return poule;
  }

}
