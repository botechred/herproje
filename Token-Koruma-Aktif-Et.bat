@echo off
chcp 65001 > nul
setlocal
title Token Koruma ve Hizlandirma Kalkani - herproje

echo ==========================================================
echo   HERPROJE TOKEN KORUMASI VE STANDARTLARI BASLATILIYOR...
echo ==========================================================
echo.

node "%~dp0scripts\apply-token-guard.js"

echo.
echo Islem tamamlandi. Cikmak icin herhangi bir tusa basin...
pause > nul
