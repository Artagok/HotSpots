# Simple test of a working connection to MongoDB through pymongo
# python3.7 recommended

from pymongo import MongoClient

client = MongoClient("mongodb+srv://admin:admin@hackupc2019-n6sxc.mongodb.net/HackUPC2019?retryWrites=true&w=majority")
db = client.get_database('HackUPC2019')

print("DB:")
print(db)

records = db.pushpins
print("____________")
print("PUSHPINS:")
print(records)


new_pin = ({
	"coords": [
		41.404871,
		2.1491
	],
	"type": "burglary",
	"description": "THIS SHOULD WORK",
	"date": "2019-10-11T22:10:23.533Z",
	"event_count": 5,
	"__v": 0
})

print("inserting pin...")

records.insert_one(new_pin)

print("... ping inserted.")
print("Finding documents...")
print(list(records.find()))
