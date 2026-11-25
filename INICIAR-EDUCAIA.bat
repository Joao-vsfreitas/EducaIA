@echo off
title EducaIA - Assistente Inteligente
cd /d "%~dp0"
echo ==========================================
echo             EDUCAIA - PROTOTIPO
echo ==========================================
if not exist ".env" (
  echo Arquivo .env nao encontrado.
  echo Copie .env.example para .env e configure sua chave Gemini.
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo Instalando dependencias...
  call npm install
)
echo.
echo Iniciando servidor...
call npm start
pause
