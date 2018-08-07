import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition/competition.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { Competition } from '../../../models/competition.model';

@Component({
  selector: 'competition-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {

  public competition: Competition = undefined;
  private user: User;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.competitionService.getCompetition(this.route.snapshot.paramMap.get('id')).then(
      competition => {
        this.competition = competition
        console.log(competition);
      });
    this.authService.user.subscribe(user =>{
      if(user){
        this.user = user;
      }else{
        this.user = null;
      }
    });
  }
}
