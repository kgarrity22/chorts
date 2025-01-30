import csv
import json

# full data
data_json_path = '/Users/kathleengarrity/Desktop/chorts/src/visualizations/celtics-championships/data/data.json'
# base csv path - need to add the year
base_players_csv_path = '/Users/kathleengarrity/Desktop/chorts/src/visualizations/celtics-championships/data/roster-data/players'

# store updated data
updated_data = []

# combining the data from the two original sources (population & border data)
def addPlayersData():
    with open(data_json_path, 'r') as json_file:
        records = json.load(json_file)

        for r in records:
            # add the year to the path
            new_path = base_players_csv_path + r["Season"][-5:] + ".csv"
            with open(new_path, 'r') as csv_file:
                csv_reader = csv.DictReader(csv_file)
                roster = []
                for row in csv_reader:
                    # print("ROW: ", row)
                    roster.append({"player": row["Player"], "number": row["No."]})
                r["Roster"]  = roster
                updated_data.append(r)


    with open(data_json_path, 'w') as json_file:
        json.dump(updated_data, json_file, indent=4)  

addPlayersData()
