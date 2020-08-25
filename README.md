# Regime_Energetique
Ma cuisine intégrée, une allégorie musicale de ma consommation énergétique ! 


Programme Node.js qui se connecte à un arduino, créé un serveur websocket pour envoyer toutes les données à des clients web pour la diffusion d'une ambiance sonore synchronisée et l'affichage d'un paysage synchronisée aussi.





Lancer chrome avec cette commande pour permettre la diffusion de sons sans l'action de l'utilisateur
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --autoplay-policy=no-user-gesture-required 

Infos : https://www.chromium.org/developers/how-tos/run-chromium-with-flags 




Droits ports USB pour Ubuntu : 

sudo usermod -a -G dialout username
sudo usermod -a -G tty username
sudo su
cd /dev
chown username ttyACM0
