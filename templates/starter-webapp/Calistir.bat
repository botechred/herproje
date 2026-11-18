@echo off
chcp 65001 > nul
title {{PROJE}} - Yerel Sunucu
start "" http://localhost:3000
node "%~dp0server.js"
