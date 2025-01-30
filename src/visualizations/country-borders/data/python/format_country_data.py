import csv
import json

# borders data
population_json_path = '/Users/kathleengarrity/Desktop/chorts/src/visualizations/country-borders/data/python/country-populations.json'
# population data
borders_csv_path= '/Users/kathleengarrity/Desktop/chorts/src/visualizations/country-borders/data/python/country-borders.csv'

# path for final file to write to 
completed_file_path = '/Users/kathleengarrity/Desktop/chorts/src/visualizations/country-borders/data/data.json'

# network data file path
network_file_path = '/Users/kathleengarrity/Desktop/chorts/src/visualizations/country-borders/data/country-network-data.json'

# keep track of countries we've already iterated through
country_lookup = {}

# combining the data from the two original sources (population & border data)
def combineData():
    with open(borders_csv_path, 'r') as csv_file, open(population_json_path, 'r') as json_file:
        csv_reader = csv.DictReader(csv_file)
        populations_list = json.load(json_file)

        for row in csv_reader:
            print('row visited', row)
            # if we've already seen this country, just update the record with thew new border countries
            if row['country_name'] in country_lookup.keys():
                country_lookup[row['country_name']]['border_codes'].append(row['country_border_code'])
                country_lookup[row['country_name']]['border_names'].append(row['country_border_name'])
            else:
                # otherwise, we find the population
                    population = 0
                    for rec in populations_list:
                        if (rec['country'] == row['country_name']):
                            population = rec['population']

                    # find the population from the json
                    country_lookup[row['country_name']] = {
                        'country_name': row['country_name'], 
                        'country_code': row['country_code'], 
                        'border_codes': [row['country_border_code']],
                        'border_names': [row['country_border_name']],
                        'population': population
                    }

    # print("ALL set : ", country_lookup)
    writeData(country_lookup)

def writeData(data):
    with open(completed_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)  

def formatDataForNetwork(data):
    nodes = []
    links = []
    # for each item in the json we're working with
    # create a node for it
    # node --> name: country_name, code: country_code, population: population, border_num = border_names.length
    # for each item in border_names
    # create a link where source = country_name, target = item in border name, population, border_num = 
    for item in data.values():
        node = {
            'name': item['country_name'], 
            'code': item['country_code'], 
            'population': item['population'], 
            'border_num': len(item['border_names'])
        }
        nodes.append(node)

        # rm empty strings from links
        border_links = [b for b in item['border_names'] if b]
        for country in border_links:

            print(item['country_name'])
            link = {
                'source': item['country_name'],
                'target': country,
                'population': item['population'], 
                'border_num': len(item['border_names']),
                
            }
            links.append(link)

    # write it to a new file now
    with open(network_file_path, 'w') as json_file:
        json.dump({'nodes': nodes, 'links': links}, json_file, indent=4)  

# combineData()
# formatDataForNetwork(cleanData)