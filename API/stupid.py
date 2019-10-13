from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

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

