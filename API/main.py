import json
from fetcher.data_fetch import fetch_locales,  fetch_ensenyament, fetch_qualitat
from enum import Enum
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from fastapi.encoders import jsonable_encoder

class ModelName(str, Enum):
    kidnapping = "kidnapping"
    voluntaryManslaughter = "voluntary-manslaughter"
    burglary = "burglary"
    childAbuse = "child-abuse"
    rape = "rape"
    homicide = "homicide"
    theft = "theft"
    shoplifting = "shoplifting"
    vandalism = "vandalism"
    sexualAssault = "sexual-assault"
    drugTrafficking = "drug-trafficking"
    fraud = "fraud"
    publicIntoxication = "public-intoxication"
    disturbingThePeace = "disturbing-the-peace"
    extortion = "extortion"
    justifiableHomicide = "justifiable-homicide"
    drugPossession = "drug-possession"

class Pin(BaseModel):
    type: str
    description: str
    coords: list
    event_count: int
    locale: str
    q_air: str
    child_infra: str


app = FastAPI()


# Important to allow e.g. Express to run in order to connect with MongoDB
origins = [
    "http:localhost",
    "http:localhost:8080",
    "http://localhost:8080"
    "http:localhost:8000",
    "http://localhost:8000"
    "http:localhost:3000",
    "http://localhost:3000"
    "http://localhost:5000",
    "https://localhost:5000",
    "147.83.201.96",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # allow_origin = origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/type/{model_name}")
async def type_specific(model_name: ModelName):
    with open('whole_events.json') as json_file:
        data = json.load(json_file)
    to_return = []
    for element in data:
        if element["type"] == model_name:
            to_return.append(element)
    return to_return


@app.get("/typeold")
async def type_old():
    with open('whole_events.json') as json_file:
        data = json.load(json_file)
    return data


@app.get("/type")
async def type_bd():
    client = MongoClient(
        "mongodb+srv://admin:admin@hackupc2019-n6sxc.mongodb.net/HackUPC2019?retryWrites=true&w=majority")
    db = client.get_database('HackUPC2019')
    records = db.pushpins
    new_records = []
    for element in list(records.find()):
        new_subelement = {}
        new_subelement["type"] = element["type"]
        new_subelement["description"] = element["description"]
        new_subelement["event_count"] = element["event_count"]
        new_subelement["coords"] = element["coords"]
        new_records.append(new_subelement)

    return new_records

@app.post("/newpin")
async def newpin(item: Pin):
    client = MongoClient("mongodb+srv://admin:admin@hackupc2019-n6sxc.mongodb.net/HackUPC2019?retryWrites=true&w=majority")
    db = client.get_database('HackUPC2019')

    lon = item.coords[0]
    lat = item.coords[1]

    item.locale = fetch_locales(lat, lon)
    item.q_air = fetch_qualitat(lat, lon)
    item.child_infra = fetch_ensenyament(lat, lon)

    json_compatible_item_data = jsonable_encoder(item)
    records = db.pushpins
    new_pin = json_compatible_item_data
    records.insert_one(new_pin)
    return item

