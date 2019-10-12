import json
from enum import Enum
from fastapi import FastAPI


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
