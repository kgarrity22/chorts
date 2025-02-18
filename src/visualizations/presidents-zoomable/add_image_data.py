# Adding working images from to existing json data 
# (source image data: https://observablehq.com/@observablehq/plot-image-dodge)
import csv
import json


# helper to look up csv row
def find_row_by_property(file_path, property_name, property_value):
    """
    Finds and returns the first row in a CSV file where the specified property
    matches the given value.

    Args:
        file_path (str): The path to the CSV file.
        property_name (str): The name of the column (property) to search in.
        property_value: The value to search for.

    Returns:
        list: A list representing the row if found, otherwise None.
    """
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row[property_name] == property_value:
                return row
    return None

writeFilePath = r'/Users/kathleengarrity/Desktop/chorts/src/visualizations/presidents-zoomable/presidents-data.json'
readFilePath = r'/Users/kathleengarrity/Desktop/chorts/src/visualizations/presidents-zoomable/us-president-favorability@2.csv'

data_with_images = []
with open(readFilePath, encoding='utf-8') as readf:
         with open(writeFilePath, 'r') as writef:
            csvReader = csv.DictReader(readf)
            jsonReader = json.load(writef)

            for record in jsonReader:
                  newRecord = {}
                  name = record['name']

                  # find the row where the name matches
                  row = find_row_by_property(readFilePath, 'Name', name)
                  # update the record with the image url
                  newRecord = {**record, 'image': row['Portrait URL']}
                  # add data to the array
                  data_with_images.append(newRecord)
            
with open(writeFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data_with_images, indent=4))