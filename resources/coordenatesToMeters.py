# import math and jason required, as:

import math
import json

def coordenatesToMeters(latFrom, lonFrom, latTo, lonTo):
    latFrom = math.radians(latFrom)
    lonFrom = math.radians(lonFrom)
    latTo = math.radians(latTo)
    lonTo = math.radians(lonTo)
    earthRadius = 6371000
    latDelta = latTo - latFrom
    lonDelta = lonTo - lonFrom
    angle = 2 * math.asin(math.sqrt(math.pow(math.sin(lonDelta/2), 2) + math.cos(latFrom) * math.cos(latTo) * math.pow(math.sin(lonDelta / 2), 2)))
    return angle * earthRadius

def IsOnCircleList(lat, longit):
    for row in circleList:
        if (coordenatesToMeters(lat, longit, row["departure_latitude"], row["departure_longitude"]) <= SUPPOSEDRANGE):
            return True
    return False
