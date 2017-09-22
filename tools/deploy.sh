#!/bin/bash

ng build -prod --build-optimizer --named-chunks && yarn run gfp && firebase deploy
