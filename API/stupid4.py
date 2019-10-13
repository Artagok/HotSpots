import json
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

app = FastAPI()

client = MongoClient("mongodb+srv://admin:admin@hackupc2019-n6sxc.mongodb.net/HackUPC2019?retryWrites=true&w=majority")
db = client.get_database('HackUPC2019')

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
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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


@app.get("/type")
async def type_all():
    with open('whole_events.json') as json_file:
        data = json.load(json_file)
    return data

@app.get("/pin/{theType}/{theDescription}/{theCoords}/{theEventCount}")
async def pin(theType, theDescription, theCoords, theEventCount):
    records = db.pushpins
    new_pin = ({
        "coords": theCoords,
        "type": theType,
        "description": theDescription,
        "event_count": theEventCount,
    })

    print("inserting pin...")

    records.insert_one(new_pin)

    print("... ping inserted.")
    print("Finding documents...")
    print(list(records.find()))
    return new_pin

    """
    json_compatible_item_data = jsonable_encoder(item)
    # db created globally, so always available - BAD practice, just to test:
    records = db.pushpins
    #new_pin = item
    new_pin = json_compatible_item_data
    records.insert_one(new_pin)
    return item
    """


@app.post("/newpin/")
async def newpin(item: Pin):
    json_compatible_item_data = jsonable_encoder(item)
    # db created globally, so always available - BAD practice, just to test:
    records = db.pushpins
    #new_pin = item
    new_pin = json_compatible_item_data
    records.insert_one(new_pin)
    return item

