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
print("__________")
print("Finding documents...")
print(list(records.find()))
print("______________")
print("______________")
print("______________")
print("______________")
print("______________")
new_records = []
for element in list(records.find()):
    new_subelement = {}
    new_subelement["type"] = element["type"]
    new_subelement["description"] = element["description"]
    new_subelement["event_count"] = element["event_count"]
    new_subelement["coords"] = element["coords"]
    new_records.append(new_subelement)

print("__________________")
print(new_records)



print("____________")
