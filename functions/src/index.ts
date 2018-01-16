import * as functions from 'firebase-functions';
import * as fetch from 'node-fetch';

export const generateSitemap = functions.https.onRequest((req, res) => {
    const speakerData = fetch('https://devfestmn.firebaseio.com/devfest2018/speakers.json');
    const sessionData = fetch('https://devfestmn.firebaseio.com/devfest2018/schedule.json');

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
            sitemap += `https://devfest.mn/2018/speakers/${key}/${name}\n`;
        }
        for(const key in sessions) {
            const title = encodeURIComponent(sessions[key].title);
            sitemap += `https://devfest.mn/2018/schedule/${key}/${title}\n`
        }
        res.send(sitemap);
    })
    .catch(err => {
        res.send({msg: 'Error generating sitemap', error: err});
    });
});
