@echo off
setlocal

set "nodejs_path="

echo Tentative de recherche de Node.js
timeout /nobreak /t 1 >nul

:loading
echo.
echo Chargement en cours.
timeout /nobreak /t 1 >nul
cls

echo.
echo Chargement en cours..
timeout /nobreak /t 1 >nul
cls

echo.
echo Chargement en cours...
timeout /nobreak /t 1 >nul
cls

for /f "tokens=*" %%i in ('where node') do (
    set "nodejs_path=%%i"
)

if not defined nodejs_path (
    echo Node.js non trouvé, tentative d'installation à l'aide de Scoop, cela échouera probablement
    where scoop >nul 2>nul
    if %errorlevel% neq 0 (
        echo Installation de Scoop en cours...
        echo Une fois Scoop installé, fermez et ouvrez à nouveau le terminal
        Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
        echo.
        pause
        exit /b 1
    )

    echo Installation de Node.js en utilisant Scoop...
    call scoop install nodejs

    where node >nul 2>nul
    if %errorlevel% neq 0 (
        echo Impossible d'installer Node.js, installez-le manuellement depuis : https://nodejs.org/en
        pause
        exit /b 1
    )

    for /f "tokens=*" %%i in ('where node') do (
        set "nodejs_path=%%i"
    )
)

echo Node.js trouvé à : %nodejs_path%
node --version

if not exist "node_modules" (
    echo Installation...
    call npm i
)

where tsx >nul 2>nul
if %errorlevel% neq 0 (
    echo Installation de tsx en cours..
    call npm i -g tsx
)

tsx .

endlocal
