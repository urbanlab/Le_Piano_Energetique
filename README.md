# Regime_Energetique

Ma cuisine intégrée, une allégorie musicale de ma consommation énergétique !

Programme Node.js qui se connecte à un arduino, créé un serveur websocket pour envoyer toutes les données à des clients web pour la diffusion d'une ambiance sonore synchronisée et l'affichage d'un paysage synchronisée aussi.

## 1er lancement

npm install
npm start

## Accès à la télécommande

Dans le fichier V1/public/teleco/index.html :
Spécifier l'ip locale de la machine à la ligne :
let socket = io("ip:3000");

## Droits ports USB pour Ubuntu

sudo usermod -a -G dialout username
sudo usermod -a -G tty username
sudo su
cd /dev
chown username ttyACM0

## Accès

Visualisation : 192.168.0.100:3000/teleco
Player Son : 192.168.0.100:3000/player
Telecommande : 192.168.0.100:3000/teleco

## WIFI

SSID : regime-energetique
PASSWORD : regime2020

## MISE À JOUR AFFICHAGE

/V1/PUBLIC/VISU/JS/DATA.JS
