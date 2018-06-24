import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { YearService } from '../year.service';
import { NAMED_ENTITIES } from '@angular/compiler';
import { AuthService } from '../shared/auth.service';

@Component({
    templateUrl: 'session-report.component.html'
})
export class SessionReportComponent {
    sessions: Observable<any>;
    year;

    constructor(http: HttpClient, yearService: YearService, public auth: AuthService) {
        this.year = yearService.year;
        let allData = http.get<{feedback: any, schedule: any, speakers: any}>(`https://devfestmn.firebaseio.com/devfest${yearService.year}.json`);

        let tenthsRound = x => Math.round(x*10)/10;

        // Format the data like we want it
        this.sessions = allData.pipe(map(allData => {
            let feedback = allData.feedback;
            let collectedFeedback = {};
            let sessions = allData.schedule;
            let result = [];

            // Invert the array so we can do session lookups
            for(let user of Object.keys(feedback)) {
                for(let session of Object.keys(feedback[user])) {
                    if(!collectedFeedback[session]) {
                        collectedFeedback[session] = [];
                    }
                    collectedFeedback[session].push(feedback[user][session]);
                }
            }

            // Generate Session Objects
            for(let session of Object.keys(sessions)) {
                let sessionData = {name: sessions[session].title, speakers: [], ratingsCount: 0, content: 0, recommendation: 0, speaker: 0, totalScore: 0};

                // Speakers
                if(sessions[session].speakers) {
                    for(let lookupKey of Object.keys(sessions[session].speakers)) {
                        let speakerKey = sessions[session].speakers[lookupKey];
                        // Have to do this if check because some speaker lists look like arrays and firebase fills in missing numbers with nulls
                        // Have to do second check because we had some pointers that pointed at speakers that didn't exist
                        if(speakerKey && allData.speakers[speakerKey]) {
                            sessionData.speakers.push(allData.speakers[speakerKey].name);
                        }
                    }
                }



                // Ratings
                if(collectedFeedback[session]) {
                    let count = 0;
                    let contentCount = 0, recommendationCount = 0, speakerCount = 0;
                    let content = 0, recommendation = 0, speaker = 0;


                    for(let feedbackItem of collectedFeedback[session]) {
                        count++;
                        if(feedbackItem.content !== undefined) {
                            content += feedbackItem.content;
                            contentCount++;
                        }
                        if(feedbackItem.recommendation !== undefined) {
                            recommendation += feedbackItem.recommendation;
                            recommendationCount++;
                        }
                        if(feedbackItem.speaker !== undefined) {
                            speaker += feedbackItem.speaker;
                            speakerCount++;
                        }
                    }

                    sessionData.content = tenthsRound(content/contentCount);
                    sessionData.recommendation = tenthsRound(recommendation/recommendationCount);
                    sessionData.speaker = tenthsRound(speaker/speakerCount);

                    sessionData.ratingsCount = count;
                    sessionData.totalScore = sessionData.content + sessionData.recommendation + sessionData.speaker + (count/5);
                }



                result.push(sessionData);

            }

            result = result.sort((a, b) => (a.totalScore < b.totalScore ? 1 : -1));

            return result;





        }));
    }


}
