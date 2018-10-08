import * as functions from 'firebase-functions';
import * as fetch from 'node-fetch';

import { environment } from '../../src/environments/environment.prod';

export const generateSitemap = functions.https.onRequest((req, res) => {

    const speakerData = fetch(`https://devfestmn.firebaseio.com/devfest${environment.defaultYear}/speakers.json`);
    const sessionData = fetch(`https://devfestmn.firebaseio.com/devfest${environment.defaultYear}/schedule.json`);

    let sitemap = '';

    Promise.all([
        speakerData.then(result => result.json()),
        sessionData.then(result => result.json()),
    ])
    .then(jsonData => {
        const speakers = jsonData[0];
        const sessions = jsonData[1];

        for(const key in speakers) {
            const name = encodeURIComponent(speakers[key].name);
            sitemap += `https://devfest.mn/${environment.defaultYear}/speakers/${key}/${name}\n`;
        }
        for(const key in sessions) {
            const title = encodeURIComponent(sessions[key].title);
            sitemap += `https://devfest.mn/${environment.defaultYear}/schedule/${key}/${title}\n`
        }
        res.send(sitemap);
    })
    .catch(err => {
        res.send({msg: 'Error generating sitemap', error: err});
    });
});
