# HackUPC 2019 - HotSpots

## ⚡️ Easy Incident Monitoring :mag:

Read the project presentation at [devpost](https://devpost.com/software/hotspots-f7xnvh).

We designed a web app that enables citizens to report incidents in real time as well as check the incidents around them.

The app has a 3 part architecture.

**MongoDB**

Database used to store user inputs with more information extracted from external APIs/DBs. 

**API - FastAPI**

The REST API -done with FastAPI- currently acts as the main "controller" of the whole system. The API fetches and merges the external data when a user inputs new data.

**React Frontend**

We designed a highly functional app in React that lets the user easily report new events and check the events around them. It fetches and sends all its needed data from the API

* Nil Quera - [@nilquera](https://github.com/nilquera)
* Ignasi Oliver - [@ignasioliver](https://github.com/ignasioliver)
* Ricardo Ander-Egg - [@rickaa](https://github.com/rickaa)
* Alejandro Alarcón - [@aleibz98](https://github.com/aleibz98)
* Pau Núñez - [@artagok](https://github.com/Artagok)
