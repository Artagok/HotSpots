import json
from enum import Enum
from fastapi import FastAPI
#from starlette.middleware.cors import CORSMiddleware
#from pymongo import MongoClient

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


app = FastAPI()
"""
client = MongoClient("mongodb+srv://admin:admin@hackupc2019-n6sxc.mongodb.net/HackUPC2019?retryWrites=true&w=majority")
db = client.get_database('HackUPC2019')
"""
# Important to allow e.g. Express to run in order to connect with MongoDB
origins = [
    "http:localhost",
    "http:localhost:8080",
    "http://localhost:8080"
    "http:localhost:8000",
    "http://localhost:8000"
    "http:localhost:3000",
    "http://localhost:3000",
]
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
"""
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
"""
@app.post("/add/{type}/{description}/{cords}/{event_count}")
async def addNewRecord(type: str, description: str, cords: list, event_count: int):
    # db created globally, so always available - BAD practice, just to test:
    records = db.pushpins
    new_pin = ({
        "coords": cords,
        "type": type,
        "description": description,
        "event_count": event_count,
    })
    records.insert_one(new_pin)
    with open('whole_events.json') as json_file:
        data = json.load(json_file)
    return data
"""
"""
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.price, "item_id": item_id}
"""