@echo off
chcp 65001 > nul
title {{PROJE}} Desktop Engine
start /b node "%~dp0server.js"
timeout /t 1 /nobreak > nul

if exist "D:\tools\Chrome\chrome.exe" (
  start "" "D:\tools\Chrome\chrome.exe" --app=http://localhost:3000
) else if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:3000
) else (
  start "" http://localhost:3000
)
