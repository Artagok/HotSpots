"""Funciones para extraer datos de otros BDs (CSVs).

Todas las funciones aceptan una lat: float y lon: float como parámetros
"""


import pandas as pd
import numpy as np
from scipy.spatial.distance import cdist
import os

cwd = os.getcwd()


def read(path, na=np.nan):
    """Read CSV with some fancy features."""

    df = (
        pd.read_csv(path, na_values=na)
        .dropna(how="all", axis=0)
        .rename(str.lower, axis="columns")
        .rename(lambda x: x.replace(" ", "_"), axis="columns")
    )

    return df


def fetch_locales(lat: float, lon: float, ndigits: int = 3):
    """Inventario de locales de la ciudad de Barcelona.

    Con el objectivo de identificar todos los locales en planta baja con actividad económica o sin actividad."""

    # create bounding box for coordinates
    # add 0.001
    add = round(1 * 10 ** -(ndigits), ndigits=ndigits + 1)
    lat = round(lat, ndigits=ndigits)
    lon = round(lon, ndigits=ndigits)

    lat_min = round(lat - add, ndigits=ndigits)
    lon_min = round(lon - add, ndigits=ndigits)

    lat_max = round(lat + add, ndigits=ndigits)
    lon_max = round(lon + add, ndigits=ndigits)

    # print(lat, lon, lat_min, lon_min, lat_max, lon_max)

    df = read(cwd + "/fetcher/data/2016_cens_locals_plantabaixa.csv")
    df = df[["latitud", "longitud", "id_princip"]]

    df = df.loc[
        df["longitud"].between(lon_min, lon_max, inclusive=True)
        & df["latitud"].between(lat_min, lat_max, inclusive=True)
    ]

    try:
        active = df["id_princip"].value_counts()[1]
    except:
        active = 0

    # es mejor práctica capturar todos los posibles errores (abajo) pero asi es 100% seguro que tira
    # except KeyError:
    #    active = 0
    # except IndexError:
    #    active = 0

    try:
        inactive = df["id_princip"].value_counts()[0]
    except:
        inactive = 0

    # es mejor práctica capturar todos los posibles errores (abajo) pero asi es 100% seguro que tira

    # except KeyError:
    #    inactive = 0
    # except IndexError:
    #    inactive = 0

    return {"active": int(active), "inactive": int(inactive)}


def closest_point(point, points):
    """Find closest point from a list of points."""

    return points[cdist([point], points).argmin()]


def fetch_qualitat(lat: float, lon: float, ndigits: int = 3):
    """Find closer station and fetch data.

    El valor que devuelve son el número de intervalos de 1h en los que
    la calidad del aire era X, por ej. 'qa_high': 450 significa que en ese
    mes han habido 450 intervalos de 1h en los que la calidad era alta.
    """

    # create bounding box for coordinates

    lat = round(lat, ndigits=ndigits)
    lon = round(lon, ndigits=ndigits)

    # print(closest)

    df = read(cwd + "/fetcher/data/2019_01_Gener_qualitat_aire_BCN.csv", na="--")
    df = df[["latitud", "longitud", "qualitat_aire"]]

    point = (lat, lon)
    points = list(zip(df["latitud"], df["longitud"]))
    closest = closest_point(point, points)

    df = df.loc[(df["longitud"] == closest[1]) & (df["latitud"] == closest[0])]

    assert df.shape != (0, 0)

    try:
        qa_bona = df["qualitat_aire"].value_counts()["Bona"]
    except:
        qa_bona = 0

    try:
        qa_regular = df["qualitat_aire"].value_counts()["Regular"]
    except:
        qa_regular = 0

    try:
        qa_pobre = df["qualitat_aire"].value_counts()["Pobra"]
    except:
        qa_pobre = 0

    return {
        "qa_high": int(qa_bona),
        "qa_medium": int(qa_regular),
        "qa_low": int(qa_pobre),
    }


def fetch_ensenyament(lat: float, lon: float, ndigits: int = 3):
    """Inventario de locales de la ciudad de Barcelona con el objectivo de identificar
    todos los locales en planta baja con actividad económica o sin actividad."""

    # create bounding box for coordinates
    # add 0.002
    add = round(2 * 10 ** -(ndigits), ndigits=ndigits + 1)
    lat = round(lat, ndigits=ndigits)
    lon = round(lon, ndigits=ndigits)

    lat_min = round(lat - add, ndigits=ndigits)
    lon_min = round(lon - add, ndigits=ndigits)

    lat_max = round(lat + add, ndigits=ndigits)
    lon_max = round(lon + add, ndigits=ndigits)

    # print(lat, lon, lat_min, lon_min, lat_max, lon_max)

    df = read(cwd + "/fetcher/data/E0001_Ensenyament_Infantil.csv").drop_duplicates(
        subset=["codi_equipament"]
    )

    # df = df[["latitud", "longitud", "id_princip"]]

    df = df.loc[
        df["longitud"].between(lon_min, lon_max, inclusive=True)
        & df["latitud"].between(lat_min, lat_max, inclusive=True)
    ]

    return {"equip_infantil": int(df.shape[0])}
