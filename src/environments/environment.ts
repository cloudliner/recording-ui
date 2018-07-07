// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAaPIU7NiOkDd71H_eNsn_EQPnt4A4kmVI',
    authDomain: 'chrome-recording-208807.firebaseapp.com',
    databaseURL: 'https://chrome-recording-208807.firebaseio.com',
    projectId: 'chrome-recording-208807',
    storageBucket: 'chrome-recording-208807.appspot.com',
    messagingSenderId: '474667216230'
  },
  skyway: {
    apiKey: '947ecee7-dded-4fcb-b9e1-2942e4ad9f1c'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
