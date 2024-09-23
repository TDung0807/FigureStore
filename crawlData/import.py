import psycopg2
import json

with open('crawlData\products.json', 'r', encoding='utf-8') as json_file:
    data_to_insert = json.load(json_file)

conn = psycopg2.connect(
    host="localhost",
    database="FigureDatabase",
    user="postgres",
    password="password"
)

cur = conn.cursor()

insert_query = """
    INSERT INTO "FigureSchema"."Figure" ("ID", "Name", "Brand", "Material", "Height", "Release_date", "Title", "URL", "ImageURL", "Price")
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT ("ID") DO UPDATE 
    SET 
        "Name" = EXCLUDED."Name",
        "Brand" = EXCLUDED."Brand",
        "Material" = EXCLUDED."Material",
        "Height" = EXCLUDED."Height",
        "Release_date" = EXCLUDED."Release_date",
        "Title" = EXCLUDED."Title",
        "URL" = EXCLUDED."URL",
        "ImageURL" = EXCLUDED."ImageURL",
        "Price" = EXCLUDED."Price";
"""

for item in data_to_insert:
    cur.execute(insert_query, (
        item["ID"],
        item["Name"],
        item["Brand"],
        item["Material"],
        item["Height"],
        item["Release_date"],
        item["Title"],
        item["URL"],
        item["ImageURL"],
        item["Price"]
    ))

conn.commit()

cur.close()
conn.close()

print("Data inserted or updated successfully!")
