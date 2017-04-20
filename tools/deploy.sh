#!/bin/bash

ng build -prod
node tools/generate-http-push.js
firebase deploy
