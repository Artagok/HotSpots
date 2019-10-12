import json
from enum import Enum
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

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
