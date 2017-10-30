#!/bin/bash

ng build -prod --named-chunks && \
node_modules/.bin/ngsw-config dist/ src/ngsw.json && \
cp node_modules/@angular/service-worker/ngsw-worker.js dist/
yarn run gfp && firebase deploy
