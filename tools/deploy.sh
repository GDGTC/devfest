#!/bin/bash
yarn build && \
yarn run gfp && \
firebase deploy
