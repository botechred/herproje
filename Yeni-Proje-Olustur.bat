@echo off
chcp 65001 > nul
setlocal
title Yeni Proje Sihirbazi - herproje
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\new-project.ps1"
pause
