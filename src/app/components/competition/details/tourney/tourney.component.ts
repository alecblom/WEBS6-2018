import { Component, OnInit, Input } from '@angular/core';
import { Competition } from '../../../../models/competition.model';
import { Participant } from '../../../../models/participant.model';
import { Match } from '../../../../models/match.model';
import { UUID } from 'angular2-uuid';
import { CompetitionService } from '../../../../services/competition/competition.service';

@Component({
  selector: 'details-tourney',
  templateUrl: './tourney.component.html',
  styleUrls: ['./tourney.component.scss']
})
export class DetailsTourneyComponent implements OnInit {

  @Input() competition: Competition

  constructor(private competitionService: CompetitionService) { }

  ngOnInit() {
    this.competition.participants.sort((p1, p2) => (p2.points - p1.points))
  }

  newRound(){
    let startDate: Date = new Date(this.competition.startDate)
    let matchTime = this.competition.matchTime.split(":")
    let newMatchTime = new Date(startDate.setTime(startDate.getTime() + ((+matchTime[0] * 3600000) +  (+matchTime[1] * 60000))))
    let matches: Array<Match> = []
    this.competition.participants.forEach((participant1, outer) =>{
      this.competition.participants.forEach((participant2, inner) => {
        if(inner <= outer){
          return
        }
        let match: Match = {
          uid: UUID.UUID(),
          participants: [participant1, participant2],
          round: 1,
          startTime: newMatchTime
        }
        matches.push(match)
        newMatchTime = new Date(startDate.setTime(startDate.getTime() + ((+matchTime[0] * 3600000) +  (+matchTime[1] * 60000))))
      })
    })
    Competition.addRound(this.competition, matches)
    this.competitionService.updateCompetition(this.competition)
  }
  
  addParticipantToCompetition(participant: Participant){
    console.log("tourney add")
  }

}
