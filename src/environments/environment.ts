// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    defaultYear: 2018,
    siteName: 'DevFestMN',
    firebaseConfig: {
        apiKey: 'AIzaSyBrWJx91j512T3q6AaTGNxu_3fq47bYhfg',
        authDomain: 'devfestmn.firebaseapp.com',
        databaseURL: 'https://devfestmn.firebaseio.com',
        projectId: 'firebase-devfestmn',
        storageBucket: 'firebase-devfestmn.appspot.com',
        messagingSenderId: '27347020178',
    },
    showRegister: 'https://devfestmn.eventbrite.com/?aff=devfestmnwebsite',
    showCFP: false,
    showSchedule: true,
    showSpeakers: true,
};
