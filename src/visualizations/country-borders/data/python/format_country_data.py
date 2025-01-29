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

cleanData = {
  "Andorra": {
    "country_name": "Andorra",
    "country_code": "AD",
    "border_codes": ["FR", "ES"],
    "border_names": ["France", "Spain"],
    "population": 77006
  },
  "United Arab Emirates": {
    "country_name": "United Arab Emirates",
    "country_code": "AE",
    "border_codes": ["OM", "SA"],
    "border_names": ["Oman", "Saudi Arabia"],
    "population": 9630959
  },
  "Afghanistan": {
    "country_name": "Afghanistan",
    "country_code": "AF",
    "border_codes": ["CN", "IR", "PK", "TJ", "TM", "UZ"],
    "border_names": [
      "China",
      "Iran (Islamic Republic of)",
      "Pakistan",
      "Tajikistan",
      "Turkmenistan",
      "Uzbekistan"
    ],
    "population": 37172386
  },
  "Antigua and Barbuda": {
    "country_name": "Antigua and Barbuda",
    "country_code": "AG",
    "border_codes": [""],
    "border_names": [""],
    "population": 96286
  },
  "Anguilla": {
    "country_name": "Anguilla",
    "country_code": "AI",
    "border_codes": [""],
    "border_names": [""],
    "population": 15094
  },
  "Albania": {
    "country_name": "Albania",
    "country_code": "AL",
    "border_codes": ["GR", "ME", "MK", "RS"],
    "border_names": ["Greece", "Montenegro", "North Macedonia", "Serbia"],
    "population": 2866376
  },
  "Armenia": {
    "country_name": "Armenia",
    "country_code": "AM",
    "border_codes": ["AZ", "GE", "IR", "TR"],
    "border_names": [
      "Azerbaijan",
      "Georgia",
      "Iran (Islamic Republic of)",
      "Turkey"
    ],
    "population": 2951776
  },
  "Angola": {
    "country_name": "Angola",
    "country_code": "AO",
    "border_codes": ["CG", "CD", "NA", "ZM"],
    "border_names": [
      "Congo",
      "Congo (the Democratic Republic of the)",
      "Namibia",
      "Zambia"
    ],
    "population": 30809762
  },
  "Antarctica": {
    "country_name": "Antarctica",
    "country_code": "AQ",
    "border_codes": [""],
    "border_names": [""],
    "population": 1106
  },
  "Argentina": {
    "country_name": "Argentina",
    "country_code": "AR",
    "border_codes": ["BO", "BR", "CL", "PY", "UY"],
    "border_names": [
      "Bolivia (Plurinational State Of)",
      "Brazil",
      "Chile",
      "Paraguay",
      "Uruguay"
    ],
    "population": 44494502
  },
  "American Samoa": {
    "country_name": "American Samoa",
    "country_code": "AS",
    "border_codes": [""],
    "border_names": [""],
    "population": 55465
  },
  "Austria": {
    "country_name": "Austria",
    "country_code": "AT",
    "border_codes": ["CZ", "DE", "HU", "IT", "LI", "SK", "SI", "CH"],
    "border_names": [
      "Czechia",
      "Germany",
      "Hungary",
      "Italy",
      "Liechtenstein",
      "Slovakia",
      "Slovenia",
      "Switzerland"
    ],
    "population": 8840521
  },
  "Australia": {
    "country_name": "Australia",
    "country_code": "AU",
    "border_codes": [""],
    "border_names": [""],
    "population": 24982688
  },
  "Aruba": {
    "country_name": "Aruba",
    "country_code": "AW",
    "border_codes": [""],
    "border_names": [""],
    "population": 105845
  },
  "Aland Islands": {
    "country_name": "Aland Islands",
    "country_code": "AX",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Azerbaijan": {
    "country_name": "Azerbaijan",
    "country_code": "AZ",
    "border_codes": ["AM", "GE", "IR", "RU", "TR"],
    "border_names": [
      "Armenia",
      "Georgia",
      "Iran (Islamic Republic of)",
      "Russia",
      "Turkey"
    ],
    "population": 9939800
  },
  "Bosnia and Herzegovina": {
    "country_name": "Bosnia and Herzegovina",
    "country_code": "BA",
    "border_codes": ["HR", "ME", "RS"],
    "border_names": ["Croatia", "Montenegro", "Serbia"],
    "population": 3323929
  },
  "Barbados": {
    "country_name": "Barbados",
    "country_code": "BB",
    "border_codes": [""],
    "border_names": [""],
    "population": 286641
  },
  "Bangladesh": {
    "country_name": "Bangladesh",
    "country_code": "BD",
    "border_codes": ["IN", "MM"],
    "border_names": ["India", "Myanmar"],
    "population": 161356039
  },
  "Belgium": {
    "country_name": "Belgium",
    "country_code": "BE",
    "border_codes": ["FR", "DE", "LU", "NL"],
    "border_names": ["France", "Germany", "Luxembourg", "Netherlands"],
    "population": 11433256
  },
  "Burkina Faso": {
    "country_name": "Burkina Faso",
    "country_code": "BF",
    "border_codes": ["BJ", "CI", "GH", "ML", "NE", "TG"],
    "border_names": [
      "Benin",
      "Cote d'Ivoire",
      "Ghana",
      "Mali",
      "Niger",
      "Togo"
    ],
    "population": 19751535
  },
  "Bulgaria": {
    "country_name": "Bulgaria",
    "country_code": "BG",
    "border_codes": ["GR", "MK", "RO", "RS", "TR"],
    "border_names": [
      "Greece",
      "North Macedonia",
      "Romania",
      "Serbia",
      "Turkey"
    ],
    "population": 7025037
  },
  "Bahrain": {
    "country_name": "Bahrain",
    "country_code": "BH",
    "border_codes": [""],
    "border_names": [""],
    "population": 1569439
  },
  "Burundi": {
    "country_name": "Burundi",
    "country_code": "BI",
    "border_codes": ["CD", "RW", "TZ"],
    "border_names": [
      "Congo (the Democratic Republic of the)",
      "Rwanda",
      "Tanzania (the United Republic of)"
    ],
    "population": 11175378
  },
  "Benin": {
    "country_name": "Benin",
    "country_code": "BJ",
    "border_codes": ["BF", "NE", "NG", "TG"],
    "border_names": ["Burkina Faso", "Niger", "Nigeria", "Togo"],
    "population": 11485048
  },
  "Saint Barthelemy": {
    "country_name": "Saint Barthelemy",
    "country_code": "BL",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Bermuda": {
    "country_name": "Bermuda",
    "country_code": "BM",
    "border_codes": [""],
    "border_names": [""],
    "population": 63973
  },
  "Brunei Darussalam": {
    "country_name": "Brunei Darussalam",
    "country_code": "BN",
    "border_codes": ["MY"],
    "border_names": ["Malaysia"],
    "population": 428962
  },
  "Bolivia (Plurinational State Of)": {
    "country_name": "Bolivia (Plurinational State Of)",
    "country_code": "BO",
    "border_codes": ["AR", "BR", "CL", "PY", "PE"],
    "border_names": ["Argentina", "Brazil", "Chile", "Paraguay", "Peru"],
    "population": 11353142
  },
  "Bonaire, Sint Eustatius and Saba": {
    "country_name": "Bonaire, Sint Eustatius and Saba",
    "country_code": "BQ",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Brazil": {
    "country_name": "Brazil",
    "country_code": "BR",
    "border_codes": [
      "AR",
      "BO",
      "CO",
      "GF",
      "GY",
      "PY",
      "PE",
      "SR",
      "UY",
      "VE"
    ],
    "border_names": [
      "Argentina",
      "Bolivia (Plurinational State Of)",
      "Colombia",
      "French Guiana",
      "Guyana",
      "Paraguay",
      "Peru",
      "Suriname",
      "Uruguay",
      "Venezuela (Bolivarian Republic of)"
    ],
    "population": 209469333
  },
  "Bahamas": {
    "country_name": "Bahamas",
    "country_code": "BS",
    "border_codes": [""],
    "border_names": [""],
    "population": 385640
  },
  "Bhutan": {
    "country_name": "Bhutan",
    "country_code": "BT",
    "border_codes": ["CN", "IN"],
    "border_names": ["China", "India"],
    "population": 754394
  },
  "Bouvet Island": {
    "country_name": "Bouvet Island",
    "country_code": "BV",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Botswana": {
    "country_name": "Botswana",
    "country_code": "BW",
    "border_codes": ["NA", "ZA", "ZM", "ZW"],
    "border_names": ["Namibia", "South Africa", "Zambia", "Zimbabwe"],
    "population": 2254126
  },
  "Belarus": {
    "country_name": "Belarus",
    "country_code": "BY",
    "border_codes": ["LV", "LT", "PL", "RU", "UA"],
    "border_names": ["Latvia", "Lithuania", "Poland", "Russia", "Ukraine"],
    "population": 9483499
  },
  "Belize": {
    "country_name": "Belize",
    "country_code": "BZ",
    "border_codes": ["GT", "MX"],
    "border_names": ["Guatemala", "Mexico"],
    "population": 383071
  },
  "Canada": {
    "country_name": "Canada",
    "country_code": "CA",
    "border_codes": ["US"],
    "border_names": ["United States of America"],
    "population": 37057765
  },
  "Cocos (Keeling) Islands": {
    "country_name": "Cocos (Keeling) Islands",
    "country_code": "CC",
    "border_codes": [""],
    "border_names": [""],
    "population": 596
  },
  "Congo (the Democratic Republic of the)": {
    "country_name": "Congo (the Democratic Republic of the)",
    "country_code": "CD",
    "border_codes": ["AO", "BI", "CF", "CG", "RW", "SS", "TZ", "UG", "ZM"],
    "border_names": [
      "Angola",
      "Burundi",
      "Central African Republic",
      "Congo",
      "Rwanda",
      "South Sudan",
      "Tanzania (the United Republic of)",
      "Uganda",
      "Zambia"
    ],
    "population": 84068091
  },
  "Central African Republic": {
    "country_name": "Central African Republic",
    "country_code": "CF",
    "border_codes": ["CM", "TD", "CG", "CD", "SS", "SD"],
    "border_names": [
      "Cameroon",
      "Chad",
      "Congo",
      "Congo (the Democratic Republic of the)",
      "South Sudan",
      "Sudan"
    ],
    "population": 4666377
  },
  "Congo": {
    "country_name": "Congo",
    "country_code": "CG",
    "border_codes": ["AO", "CM", "CF", "CD", "GA"],
    "border_names": [
      "Angola",
      "Cameroon",
      "Central African Republic",
      "Congo (the Democratic Republic of the)",
      "Gabon"
    ],
    "population": 5244363
  },
  "Switzerland": {
    "country_name": "Switzerland",
    "country_code": "CH",
    "border_codes": ["AT", "FR", "DE", "IT", "LI"],
    "border_names": ["Austria", "France", "Germany", "Italy", "Liechtenstein"],
    "population": 8513227
  },
  "Cote d'Ivoire": {
    "country_name": "Cote d'Ivoire",
    "country_code": "CI",
    "border_codes": ["BF", "GH", "GN", "LR", "ML"],
    "border_names": ["Burkina Faso", "Ghana", "Guinea", "Liberia", "Mali"],
    "population": 0
  },
  "Cook Islands": {
    "country_name": "Cook Islands",
    "country_code": "CK",
    "border_codes": [""],
    "border_names": [""],
    "population": 17379
  },
  "Chile": {
    "country_name": "Chile",
    "country_code": "CL",
    "border_codes": ["AR", "BO", "PE"],
    "border_names": ["Argentina", "Bolivia (Plurinational State Of)", "Peru"],
    "population": 18729160
  },
  "Cameroon": {
    "country_name": "Cameroon",
    "country_code": "CM",
    "border_codes": ["CF", "TD", "CG", "GQ", "GA", "NG"],
    "border_names": [
      "Central African Republic",
      "Chad",
      "Congo",
      "Equatorial Guinea",
      "Gabon",
      "Nigeria"
    ],
    "population": 25216237
  },
  "China": {
    "country_name": "China",
    "country_code": "CN",
    "border_codes": [
      "AF",
      "BT",
      "HK",
      "IN",
      "KZ",
      "KP",
      "KG",
      "LA",
      "MO",
      "MN",
      "MM",
      "NP",
      "PK",
      "RU",
      "TJ",
      "VN"
    ],
    "border_names": [
      "Afghanistan",
      "Bhutan",
      "Hong Kong",
      "India",
      "Kazakhstan",
      "North Korea",
      "Kyrgyzstan",
      "Laos",
      "Macao",
      "Mongolia",
      "Myanmar",
      "Nepal",
      "Pakistan",
      "Russia",
      "Tajikistan",
      "Viet Nam"
    ],
    "population": 1392730000
  },
  "Colombia": {
    "country_name": "Colombia",
    "country_code": "CO",
    "border_codes": ["BR", "EC", "PA", "PE", "VE"],
    "border_names": [
      "Brazil",
      "Ecuador",
      "Panama",
      "Peru",
      "Venezuela (Bolivarian Republic of)"
    ],
    "population": 49648685
  },
  "Costa Rica": {
    "country_name": "Costa Rica",
    "country_code": "CR",
    "border_codes": ["NI", "PA"],
    "border_names": ["Nicaragua", "Panama"],
    "population": 4999441
  },
  "Cuba": {
    "country_name": "Cuba",
    "country_code": "CU",
    "border_codes": [""],
    "border_names": [""],
    "population": 11338138
  },
  "Cabo Verde": {
    "country_name": "Cabo Verde",
    "country_code": "CV",
    "border_codes": [""],
    "border_names": [""],
    "population": 555987
  },
  "Curacao": {
    "country_name": "Curacao",
    "country_code": "CW",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Christmas Island": {
    "country_name": "Christmas Island",
    "country_code": "CX",
    "border_codes": [""],
    "border_names": [""],
    "population": 1402
  },
  "Cyprus": {
    "country_name": "Cyprus",
    "country_code": "CY",
    "border_codes": [""],
    "border_names": [""],
    "population": 1189265
  },
  "Czechia": {
    "country_name": "Czechia",
    "country_code": "CZ",
    "border_codes": ["AT", "DE", "PL", "SK"],
    "border_names": ["Austria", "Germany", "Poland", "Slovakia"],
    "population": 10629928
  },
  "Germany": {
    "country_name": "Germany",
    "country_code": "DE",
    "border_codes": ["AT", "BE", "CZ", "DK", "FR", "LU", "NL", "PL", "CH"],
    "border_names": [
      "Austria",
      "Belgium",
      "Czechia",
      "Denmark",
      "France",
      "Luxembourg",
      "Netherlands",
      "Poland",
      "Switzerland"
    ],
    "population": 82905782
  },
  "Djibouti": {
    "country_name": "Djibouti",
    "country_code": "DJ",
    "border_codes": ["ER", "ET", "SO"],
    "border_names": ["Eritrea", "Ethiopia", "Somalia"],
    "population": 958920
  },
  "Denmark": {
    "country_name": "Denmark",
    "country_code": "DK",
    "border_codes": ["DE"],
    "border_names": ["Germany"],
    "population": 5793636
  },
  "Dominica": {
    "country_name": "Dominica",
    "country_code": "DM",
    "border_codes": [""],
    "border_names": [""],
    "population": 71625
  },
  "Dominican Republic": {
    "country_name": "Dominican Republic",
    "country_code": "DO",
    "border_codes": ["HT"],
    "border_names": ["Haiti"],
    "population": 10627165
  },
  "Algeria": {
    "country_name": "Algeria",
    "country_code": "DZ",
    "border_codes": ["LY", "ML", "MR", "MA", "NE", "TN", "EH"],
    "border_names": [
      "Libya",
      "Mali",
      "Mauritania",
      "Morocco",
      "Niger",
      "Tunisia",
      "Western Sahara"
    ],
    "population": 42228429
  },
  "Ecuador": {
    "country_name": "Ecuador",
    "country_code": "EC",
    "border_codes": ["CO", "PE"],
    "border_names": ["Colombia", "Peru"],
    "population": 17084357
  },
  "Estonia": {
    "country_name": "Estonia",
    "country_code": "EE",
    "border_codes": ["LV", "RU"],
    "border_names": ["Latvia", "Russia"],
    "population": 1321977
  },
  "Egypt": {
    "country_name": "Egypt",
    "country_code": "EG",
    "border_codes": ["IL", "LY", "PS", "SD"],
    "border_names": ["Israel", "Libya", "Palestine", "Sudan"],
    "population": 98423595
  },
  "Western Sahara": {
    "country_name": "Western Sahara",
    "country_code": "EH",
    "border_codes": ["DZ", "MR", "MA"],
    "border_names": ["Algeria", "Mauritania", "Morocco"],
    "population": 652271
  },
  "Eritrea": {
    "country_name": "Eritrea",
    "country_code": "ER",
    "border_codes": ["DJ", "ET", "SD"],
    "border_names": ["Djibouti", "Ethiopia", "Sudan"],
    "population": 6213972
  },
  "Spain": {
    "country_name": "Spain",
    "country_code": "ES",
    "border_codes": ["AD", "FR", "GI", "MA", "PT"],
    "border_names": ["Andorra", "France", "Gibraltar", "Morocco", "Portugal"],
    "population": 46796540
  },
  "Ethiopia": {
    "country_name": "Ethiopia",
    "country_code": "ET",
    "border_codes": ["DJ", "ER", "KE", "SO", "SS", "SD"],
    "border_names": [
      "Djibouti",
      "Eritrea",
      "Kenya",
      "Somalia",
      "South Sudan",
      "Sudan"
    ],
    "population": 109224559
  },
  "Finland": {
    "country_name": "Finland",
    "country_code": "FI",
    "border_codes": ["NO", "RU", "SE"],
    "border_names": ["Norway", "Russia", "Sweden"],
    "population": 5515525
  },
  "Fiji": {
    "country_name": "Fiji",
    "country_code": "FJ",
    "border_codes": [""],
    "border_names": [""],
    "population": 883483
  },
  "Falkland Islands (Malvinas)": {
    "country_name": "Falkland Islands (Malvinas)",
    "country_code": "FK",
    "border_codes": [""],
    "border_names": [""],
    "population": 2840
  },
  "Micronesia (Federated States of)": {
    "country_name": "Micronesia (Federated States of)",
    "country_code": "FM",
    "border_codes": [""],
    "border_names": [""],
    "population": 112640
  },
  "Faroe Islands": {
    "country_name": "Faroe Islands",
    "country_code": "FO",
    "border_codes": [""],
    "border_names": [""],
    "population": 48497
  },
  "France": {
    "country_name": "France",
    "country_code": "FR",
    "border_codes": ["AD", "BE", "DE", "IT", "LU", "MC", "ES", "CH"],
    "border_names": [
      "Andorra",
      "Belgium",
      "Germany",
      "Italy",
      "Luxembourg",
      "Monaco",
      "Spain",
      "Switzerland"
    ],
    "population": 66977107
  },
  "Gabon": {
    "country_name": "Gabon",
    "country_code": "GA",
    "border_codes": ["CM", "CG", "GQ"],
    "border_names": ["Cameroon", "Congo", "Equatorial Guinea"],
    "population": 2119275
  },
  "United Kingdom": {
    "country_name": "United Kingdom",
    "country_code": "GB",
    "border_codes": ["IE"],
    "border_names": ["Ireland"],
    "population": 66460344
  },
  "Grenada": {
    "country_name": "Grenada",
    "country_code": "GD",
    "border_codes": [""],
    "border_names": [""],
    "population": 111454
  },
  "Georgia": {
    "country_name": "Georgia",
    "country_code": "GE",
    "border_codes": ["AM", "AZ", "RU", "TR"],
    "border_names": ["Armenia", "Azerbaijan", "Russia", "Turkey"],
    "population": 3726549
  },
  "French Guiana": {
    "country_name": "French Guiana",
    "country_code": "GF",
    "border_codes": ["BR", "SR"],
    "border_names": ["Brazil", "Suriname"],
    "population": 290691
  },
  "Guernsey": {
    "country_name": "Guernsey",
    "country_code": "GG",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Ghana": {
    "country_name": "Ghana",
    "country_code": "GH",
    "border_codes": ["BF", "CI", "TG"],
    "border_names": ["Burkina Faso", "Cote d'Ivoire", "Togo"],
    "population": 29767108
  },
  "Gibraltar": {
    "country_name": "Gibraltar",
    "country_code": "GI",
    "border_codes": ["ES"],
    "border_names": ["Spain"],
    "population": 33718
  },
  "Greenland": {
    "country_name": "Greenland",
    "country_code": "GL",
    "border_codes": [""],
    "border_names": [""],
    "population": 56025
  },
  "Gambia": {
    "country_name": "Gambia",
    "country_code": "GM",
    "border_codes": ["SN"],
    "border_names": ["Senegal"],
    "population": 2280102
  },
  "Guinea": {
    "country_name": "Guinea",
    "country_code": "GN",
    "border_codes": ["CI", "GW", "LR", "ML", "SN", "SL"],
    "border_names": [
      "Cote d'Ivoire",
      "Guinea-Bissau",
      "Liberia",
      "Mali",
      "Senegal",
      "Sierra Leone"
    ],
    "population": 12414318
  },
  "Guadeloupe": {
    "country_name": "Guadeloupe",
    "country_code": "GP",
    "border_codes": [""],
    "border_names": [""],
    "population": 395700
  },
  "Equatorial Guinea": {
    "country_name": "Equatorial Guinea",
    "country_code": "GQ",
    "border_codes": ["CM", "GA"],
    "border_names": ["Cameroon", "Gabon"],
    "population": 1308974
  },
  "Greece": {
    "country_name": "Greece",
    "country_code": "GR",
    "border_codes": ["AL", "BG", "MK", "TR"],
    "border_names": ["Albania", "Bulgaria", "North Macedonia", "Turkey"],
    "population": 10731726
  },
  "South Georgia and the South Sandwich Islands": {
    "country_name": "South Georgia and the South Sandwich Islands",
    "country_code": "GS",
    "border_codes": [""],
    "border_names": [""],
    "population": 30
  },
  "Guatemala": {
    "country_name": "Guatemala",
    "country_code": "GT",
    "border_codes": ["BZ", "SV", "HN", "MX"],
    "border_names": ["Belize", "El Salvador", "Honduras", "Mexico"],
    "population": 17247807
  },
  "Guam": {
    "country_name": "Guam",
    "country_code": "GU",
    "border_codes": [""],
    "border_names": [""],
    "population": 165768
  },
  "Guinea-Bissau": {
    "country_name": "Guinea-Bissau",
    "country_code": "GW",
    "border_codes": ["GN", "SN"],
    "border_names": ["Guinea", "Senegal"],
    "population": 1874309
  },
  "Guyana": {
    "country_name": "Guyana",
    "country_code": "GY",
    "border_codes": ["BR", "SR", "VE"],
    "border_names": [
      "Brazil",
      "Suriname",
      "Venezuela (Bolivarian Republic of)"
    ],
    "population": 779004
  },
  "Hong Kong": {
    "country_name": "Hong Kong",
    "country_code": "HK",
    "border_codes": ["CN"],
    "border_names": ["China"],
    "population": 7451000
  },
  "Heard Island and McDonald Islands": {
    "country_name": "Heard Island and McDonald Islands",
    "country_code": "HM",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Honduras": {
    "country_name": "Honduras",
    "country_code": "HN",
    "border_codes": ["SV", "GT", "NI"],
    "border_names": ["El Salvador", "Guatemala", "Nicaragua"],
    "population": 9587522
  },
  "Croatia": {
    "country_name": "Croatia",
    "country_code": "HR",
    "border_codes": ["BA", "HU", "ME", "RS", "SI"],
    "border_names": [
      "Bosnia and Herzegovina",
      "Hungary",
      "Montenegro",
      "Serbia",
      "Slovenia"
    ],
    "population": 4087843
  },
  "Haiti": {
    "country_name": "Haiti",
    "country_code": "HT",
    "border_codes": ["DO"],
    "border_names": ["Dominican Republic"],
    "population": 11123176
  },
  "Hungary": {
    "country_name": "Hungary",
    "country_code": "HU",
    "border_codes": ["AT", "HR", "RO", "RS", "SK", "SI", "UA"],
    "border_names": [
      "Austria",
      "Croatia",
      "Romania",
      "Serbia",
      "Slovakia",
      "Slovenia",
      "Ukraine"
    ],
    "population": 9775564
  },
  "Indonesia": {
    "country_name": "Indonesia",
    "country_code": "ID",
    "border_codes": ["MY", "PG", "TL"],
    "border_names": ["Malaysia", "Papua New Guinea", "Timor-Leste"],
    "population": 267663435
  },
  "Ireland": {
    "country_name": "Ireland",
    "country_code": "IE",
    "border_codes": ["GB"],
    "border_names": ["United Kingdom"],
    "population": 4867309
  },
  "Israel": {
    "country_name": "Israel",
    "country_code": "IL",
    "border_codes": ["EG", "JO", "LB", "PS", "SY"],
    "border_names": [
      "Egypt",
      "Jordan",
      "Lebanon",
      "Palestine",
      "Syrian Arab Republic"
    ],
    "population": 8882800
  },
  "Isle of Man": {
    "country_name": "Isle of Man",
    "country_code": "IM",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "India": {
    "country_name": "India",
    "country_code": "IN",
    "border_codes": ["BD", "BT", "CN", "MM", "NP", "PK"],
    "border_names": [
      "Bangladesh",
      "Bhutan",
      "China",
      "Myanmar",
      "Nepal",
      "Pakistan"
    ],
    "population": 1352617328
  },
  "British Indian Ocean Territory": {
    "country_name": "British Indian Ocean Territory",
    "country_code": "IO",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Iraq": {
    "country_name": "Iraq",
    "country_code": "IQ",
    "border_codes": ["IR", "JO", "KW", "SA", "SY", "TR"],
    "border_names": [
      "Iran (Islamic Republic of)",
      "Jordan",
      "Kuwait",
      "Saudi Arabia",
      "Syrian Arab Republic",
      "Turkey"
    ],
    "population": 38433600
  },
  "Iran (Islamic Republic of)": {
    "country_name": "Iran (Islamic Republic of)",
    "country_code": "IR",
    "border_codes": ["AF", "AM", "AZ", "IQ", "PK", "TR", "TM"],
    "border_names": [
      "Afghanistan",
      "Armenia",
      "Azerbaijan",
      "Iraq",
      "Pakistan",
      "Turkey",
      "Turkmenistan"
    ],
    "population": 81800269
  },
  "Iceland": {
    "country_name": "Iceland",
    "country_code": "IS",
    "border_codes": [""],
    "border_names": [""],
    "population": 352721
  },
  "Italy": {
    "country_name": "Italy",
    "country_code": "IT",
    "border_codes": ["AT", "FR", "SM", "SI", "CH", "VA"],
    "border_names": [
      "Austria",
      "France",
      "San Marino",
      "Slovenia",
      "Switzerland",
      "Holy See"
    ],
    "population": 60421760
  },
  "Jersey": {
    "country_name": "Jersey",
    "country_code": "JE",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Jamaica": {
    "country_name": "Jamaica",
    "country_code": "JM",
    "border_codes": [""],
    "border_names": [""],
    "population": 2934855
  },
  "Jordan": {
    "country_name": "Jordan",
    "country_code": "JO",
    "border_codes": ["IQ", "IL", "PS", "SA", "SY"],
    "border_names": [
      "Iraq",
      "Israel",
      "Palestine",
      "Saudi Arabia",
      "Syrian Arab Republic"
    ],
    "population": 9956011
  },
  "Japan": {
    "country_name": "Japan",
    "country_code": "JP",
    "border_codes": [""],
    "border_names": [""],
    "population": 126529100
  },
  "Kenya": {
    "country_name": "Kenya",
    "country_code": "KE",
    "border_codes": ["ET", "SO", "SS", "TZ", "UG"],
    "border_names": [
      "Ethiopia",
      "Somalia",
      "South Sudan",
      "Tanzania (the United Republic of)",
      "Uganda"
    ],
    "population": 51393010
  },
  "Kyrgyzstan": {
    "country_name": "Kyrgyzstan",
    "country_code": "KG",
    "border_codes": ["CN", "KZ", "TJ", "UZ"],
    "border_names": ["China", "Kazakhstan", "Tajikistan", "Uzbekistan"],
    "population": 6322800
  },
  "Cambodia": {
    "country_name": "Cambodia",
    "country_code": "KH",
    "border_codes": ["LA", "TH", "VN"],
    "border_names": ["Laos", "Thailand", "Viet Nam"],
    "population": 16249798
  },
  "Kiribati": {
    "country_name": "Kiribati",
    "country_code": "KI",
    "border_codes": [""],
    "border_names": [""],
    "population": 115847
  },
  "Comoros": {
    "country_name": "Comoros",
    "country_code": "KM",
    "border_codes": [""],
    "border_names": [""],
    "population": 832322
  },
  "Saint Kitts and Nevis": {
    "country_name": "Saint Kitts and Nevis",
    "country_code": "KN",
    "border_codes": [""],
    "border_names": [""],
    "population": 52441
  },
  "North Korea": {
    "country_name": "North Korea",
    "country_code": "KP",
    "border_codes": ["CN", "KR", "RU"],
    "border_names": ["China", "South Korea", "Russia"],
    "population": 25549819
  },
  "South Korea": {
    "country_name": "South Korea",
    "country_code": "KR",
    "border_codes": ["KP"],
    "border_names": ["North Korea"],
    "population": 51606633
  },
  "Kuwait": {
    "country_name": "Kuwait",
    "country_code": "KW",
    "border_codes": ["IQ", "SA"],
    "border_names": ["Iraq", "Saudi Arabia"],
    "population": 4137309
  },
  "Cayman Islands": {
    "country_name": "Cayman Islands",
    "country_code": "KY",
    "border_codes": [""],
    "border_names": [""],
    "population": 64174
  },
  "Kazakhstan": {
    "country_name": "Kazakhstan",
    "country_code": "KZ",
    "border_codes": ["CN", "KG", "RU", "TM", "UZ"],
    "border_names": [
      "China",
      "Kyrgyzstan",
      "Russia",
      "Turkmenistan",
      "Uzbekistan"
    ],
    "population": 18272430
  },
  "Laos": {
    "country_name": "Laos",
    "country_code": "LA",
    "border_codes": ["CN", "KH", "MM", "TH", "VN"],
    "border_names": ["China", "Cambodia", "Myanmar", "Thailand", "Viet Nam"],
    "population": 7061507
  },
  "Lebanon": {
    "country_name": "Lebanon",
    "country_code": "LB",
    "border_codes": ["IL", "SY"],
    "border_names": ["Israel", "Syrian Arab Republic"],
    "population": 6848925
  },
  "Saint Lucia": {
    "country_name": "Saint Lucia",
    "country_code": "LC",
    "border_codes": [""],
    "border_names": [""],
    "population": 181889
  },
  "Liechtenstein": {
    "country_name": "Liechtenstein",
    "country_code": "LI",
    "border_codes": ["AT", "CH"],
    "border_names": ["Austria", "Switzerland"],
    "population": 37910
  },
  "Sri Lanka": {
    "country_name": "Sri Lanka",
    "country_code": "LK",
    "border_codes": [""],
    "border_names": [""],
    "population": 21670000
  },
  "Liberia": {
    "country_name": "Liberia",
    "country_code": "LR",
    "border_codes": ["CI", "GN", "SL"],
    "border_names": ["Cote d'Ivoire", "Guinea", "Sierra Leone"],
    "population": 4818977
  },
  "Lesotho": {
    "country_name": "Lesotho",
    "country_code": "LS",
    "border_codes": ["ZA"],
    "border_names": ["South Africa"],
    "population": 2108132
  },
  "Lithuania": {
    "country_name": "Lithuania",
    "country_code": "LT",
    "border_codes": ["BY", "LV", "PL", "RU"],
    "border_names": ["Belarus", "Latvia", "Poland", "Russia"],
    "population": 2801543
  },
  "Luxembourg": {
    "country_name": "Luxembourg",
    "country_code": "LU",
    "border_codes": ["BE", "DE", "FR"],
    "border_names": ["Belgium", "Germany", "France"],
    "population": 607950
  },
  "Latvia": {
    "country_name": "Latvia",
    "country_code": "LV",
    "border_codes": ["BY", "EE", "LT", "RU"],
    "border_names": ["Belarus", "Estonia", "Lithuania", "Russia"],
    "population": 1927174
  },
  "Libya": {
    "country_name": "Libya",
    "country_code": "LY",
    "border_codes": ["DZ", "TD", "EG", "NE", "SD", "TN"],
    "border_names": ["Algeria", "Chad", "Egypt", "Niger", "Sudan", "Tunisia"],
    "population": 6678567
  },
  "Morocco": {
    "country_name": "Morocco",
    "country_code": "MA",
    "border_codes": ["DZ", "ES", "EH"],
    "border_names": ["Algeria", "Spain", "Western Sahara"],
    "population": 36029138
  },
  "Monaco": {
    "country_name": "Monaco",
    "country_code": "MC",
    "border_codes": ["FR"],
    "border_names": ["France"],
    "population": 38682
  },
  "Moldova (the Republic of)": {
    "country_name": "Moldova (the Republic of)",
    "country_code": "MD",
    "border_codes": ["RO", "UA"],
    "border_names": ["Romania", "Ukraine"],
    "population": 2706049
  },
  "Montenegro": {
    "country_name": "Montenegro",
    "country_code": "ME",
    "border_codes": ["AL", "BA", "HR", "RS"],
    "border_names": ["Albania", "Bosnia and Herzegovina", "Croatia", "Serbia"],
    "population": 631219
  },
  "Saint Martin (French part)": {
    "country_name": "Saint Martin (French part)",
    "country_code": "MF",
    "border_codes": ["SX"],
    "border_names": ["Sint Maarten (Dutch part)"],
    "population": 0
  },
  "Madagascar": {
    "country_name": "Madagascar",
    "country_code": "MG",
    "border_codes": [""],
    "border_names": [""],
    "population": 26262368
  },
  "Marshall Islands": {
    "country_name": "Marshall Islands",
    "country_code": "MH",
    "border_codes": [""],
    "border_names": [""],
    "population": 58413
  },
  "North Macedonia": {
    "country_name": "North Macedonia",
    "country_code": "MK",
    "border_codes": ["AL", "BG", "GR", "RS"],
    "border_names": ["Albania", "Bulgaria", "Greece", "Serbia"],
    "population": 2084367
  },
  "Mali": {
    "country_name": "Mali",
    "country_code": "ML",
    "border_codes": ["DZ", "BF", "CI", "GN", "MR", "NE", "SN"],
    "border_names": [
      "Algeria",
      "Burkina Faso",
      "Cote d'Ivoire",
      "Guinea",
      "Mauritania",
      "Niger",
      "Senegal"
    ],
    "population": 19077690
  },
  "Myanmar": {
    "country_name": "Myanmar",
    "country_code": "MM",
    "border_codes": ["BD", "CN", "IN", "LA", "TH"],
    "border_names": ["Bangladesh", "China", "India", "Laos", "Thailand"],
    "population": 53708395
  },
  "Mongolia": {
    "country_name": "Mongolia",
    "country_code": "MN",
    "border_codes": ["CN", "RU"],
    "border_names": ["China", "Russia"],
    "population": 3170208
  },
  "Macao": {
    "country_name": "Macao",
    "country_code": "MO",
    "border_codes": ["CN"],
    "border_names": ["China"],
    "population": 631636
  },
  "Northern Mariana Islands": {
    "country_name": "Northern Mariana Islands",
    "country_code": "MP",
    "border_codes": [""],
    "border_names": [""],
    "population": 56882
  },
  "Martinique": {
    "country_name": "Martinique",
    "country_code": "MQ",
    "border_codes": [""],
    "border_names": [""],
    "population": 376480
  },
  "Mauritania": {
    "country_name": "Mauritania",
    "country_code": "MR",
    "border_codes": ["DZ", "ML", "SN", "EH"],
    "border_names": ["Algeria", "Mali", "Senegal", "Western Sahara"],
    "population": 4403319
  },
  "Montserrat": {
    "country_name": "Montserrat",
    "country_code": "MS",
    "border_codes": [""],
    "border_names": [""],
    "population": 5900
  },
  "Malta": {
    "country_name": "Malta",
    "country_code": "MT",
    "border_codes": [""],
    "border_names": [""],
    "population": 484630
  },
  "Mauritius": {
    "country_name": "Mauritius",
    "country_code": "MU",
    "border_codes": [""],
    "border_names": [""],
    "population": 1265303
  },
  "Maldives": {
    "country_name": "Maldives",
    "country_code": "MV",
    "border_codes": [""],
    "border_names": [""],
    "population": 515696
  },
  "Malawi": {
    "country_name": "Malawi",
    "country_code": "MW",
    "border_codes": ["MZ", "TZ", "ZM"],
    "border_names": [
      "Mozambique",
      "Tanzania (the United Republic of)",
      "Zambia"
    ],
    "population": 18143315
  },
  "Mexico": {
    "country_name": "Mexico",
    "country_code": "MX",
    "border_codes": ["BZ", "GT", "US"],
    "border_names": ["Belize", "Guatemala", "United States of America"],
    "population": 126190788
  },
  "Malaysia": {
    "country_name": "Malaysia",
    "country_code": "MY",
    "border_codes": ["BN", "ID", "TH"],
    "border_names": ["Brunei Darussalam", "Indonesia", "Thailand"],
    "population": 31528585
  },
  "Mozambique": {
    "country_name": "Mozambique",
    "country_code": "MZ",
    "border_codes": ["MW", "SZ", "ZA", "TZ", "ZM", "ZW"],
    "border_names": [
      "Malawi",
      "Eswatini",
      "South Africa",
      "Tanzania (the United Republic of)",
      "Zambia",
      "Zimbabwe"
    ],
    "population": 29495962
  },
  "Namibia": {
    "country_name": "Namibia",
    "country_code": "NA",
    "border_codes": ["AO", "BW", "ZA", "ZM"],
    "border_names": ["Angola", "Botswana", "South Africa", "Zambia"],
    "population": 2448255
  },
  "New Caledonia": {
    "country_name": "New Caledonia",
    "country_code": "NC",
    "border_codes": [""],
    "border_names": [""],
    "population": 284060
  },
  "Niger": {
    "country_name": "Niger",
    "country_code": "NE",
    "border_codes": ["DZ", "BJ", "BF", "TD", "LY", "ML", "NG"],
    "border_names": [
      "Algeria",
      "Benin",
      "Burkina Faso",
      "Chad",
      "Libya",
      "Mali",
      "Nigeria"
    ],
    "population": 22442948
  },
  "Norfolk Island": {
    "country_name": "Norfolk Island",
    "country_code": "NF",
    "border_codes": [""],
    "border_names": [""],
    "population": 2169
  },
  "Nigeria": {
    "country_name": "Nigeria",
    "country_code": "NG",
    "border_codes": ["BJ", "CM", "TD", "NE"],
    "border_names": ["Benin", "Cameroon", "Chad", "Niger"],
    "population": 195874740
  },
  "Nicaragua": {
    "country_name": "Nicaragua",
    "country_code": "NI",
    "border_codes": ["CR", "HN"],
    "border_names": ["Costa Rica", "Honduras"],
    "population": 6465513
  },
  "Netherlands": {
    "country_name": "Netherlands",
    "country_code": "NL",
    "border_codes": ["BE", "DE"],
    "border_names": ["Belgium", "Germany"],
    "population": 17231624
  },
  "Norway": {
    "country_name": "Norway",
    "country_code": "NO",
    "border_codes": ["FI", "RU", "SE"],
    "border_names": ["Finland", "Russia", "Sweden"],
    "population": 5311916
  },
  "Nepal": {
    "country_name": "Nepal",
    "country_code": "NP",
    "border_codes": ["CN", "IN"],
    "border_names": ["China", "India"],
    "population": 28087871
  },
  "Nauru": {
    "country_name": "Nauru",
    "country_code": "NR",
    "border_codes": [""],
    "border_names": [""],
    "population": 12704
  },
  "Niue": {
    "country_name": "Niue",
    "country_code": "NU",
    "border_codes": [""],
    "border_names": [""],
    "population": 1624
  },
  "New Zealand": {
    "country_name": "New Zealand",
    "country_code": "NZ",
    "border_codes": [""],
    "border_names": [""],
    "population": 4841000
  },
  "Oman": {
    "country_name": "Oman",
    "country_code": "OM",
    "border_codes": ["AE", "SA", "YE"],
    "border_names": ["United Arab Emirates", "Saudi Arabia", "Yemen"],
    "population": 4829483
  },
  "Panama": {
    "country_name": "Panama",
    "country_code": "PA",
    "border_codes": ["CO", "CR"],
    "border_names": ["Colombia", "Costa Rica"],
    "population": 4176873
  },
  "Peru": {
    "country_name": "Peru",
    "country_code": "PE",
    "border_codes": ["BO", "BR", "CL", "CO", "EC"],
    "border_names": [
      "Bolivia (Plurinational State Of)",
      "Brazil",
      "Chile",
      "Colombia",
      "Ecuador"
    ],
    "population": 31989256
  },
  "French Polynesia": {
    "country_name": "French Polynesia",
    "country_code": "PF",
    "border_codes": [""],
    "border_names": [""],
    "population": 277679
  },
  "Papua New Guinea": {
    "country_name": "Papua New Guinea",
    "country_code": "PG",
    "border_codes": ["ID"],
    "border_names": ["Indonesia"],
    "population": 8606316
  },
  "Philippines": {
    "country_name": "Philippines",
    "country_code": "PH",
    "border_codes": [""],
    "border_names": [""],
    "population": 106651922
  },
  "Pakistan": {
    "country_name": "Pakistan",
    "country_code": "PK",
    "border_codes": ["AF", "CN", "IN", "IR"],
    "border_names": [
      "Afghanistan",
      "China",
      "India",
      "Iran (Islamic Republic of)"
    ],
    "population": 212215030
  },
  "Poland": {
    "country_name": "Poland",
    "country_code": "PL",
    "border_codes": ["BY", "CZ", "DE", "LT", "RU", "SK", "UA"],
    "border_names": [
      "Belarus",
      "Czechia",
      "Germany",
      "Lithuania",
      "Russia",
      "Slovakia",
      "Ukraine"
    ],
    "population": 37974750
  },
  "Saint Pierre and Miquelon": {
    "country_name": "Saint Pierre and Miquelon",
    "country_code": "PM",
    "border_codes": [""],
    "border_names": [""],
    "population": 5888
  },
  "Pitcairn": {
    "country_name": "Pitcairn",
    "country_code": "PN",
    "border_codes": [""],
    "border_names": [""],
    "population": 67
  },
  "Puerto Rico": {
    "country_name": "Puerto Rico",
    "country_code": "PR",
    "border_codes": [""],
    "border_names": [""],
    "population": 3195153
  },
  "Palestine": {
    "country_name": "Palestine",
    "country_code": "PS",
    "border_codes": ["EG", "IL", "JO"],
    "border_names": ["Egypt", "Israel", "Jordan"],
    "population": 4569087
  },
  "Portugal": {
    "country_name": "Portugal",
    "country_code": "PT",
    "border_codes": ["ES"],
    "border_names": ["Spain"],
    "population": 10283822
  },
  "Palau": {
    "country_name": "Palau",
    "country_code": "PW",
    "border_codes": [""],
    "border_names": [""],
    "population": 17907
  },
  "Paraguay": {
    "country_name": "Paraguay",
    "country_code": "PY",
    "border_codes": ["AR", "BO", "BR"],
    "border_names": ["Argentina", "Bolivia (Plurinational State Of)", "Brazil"],
    "population": 6956071
  },
  "Qatar": {
    "country_name": "Qatar",
    "country_code": "QA",
    "border_codes": ["SA"],
    "border_names": ["Saudi Arabia"],
    "population": 2781677
  },
  "Reunion": {
    "country_name": "Reunion",
    "country_code": "RE",
    "border_codes": [""],
    "border_names": [""],
    "population": 859959
  },
  "Romania": {
    "country_name": "Romania",
    "country_code": "RO",
    "border_codes": ["BG", "HU", "MD", "RS", "UA"],
    "border_names": [
      "Bulgaria",
      "Hungary",
      "Moldova (the Republic of)",
      "Serbia",
      "Ukraine"
    ],
    "population": 19466145
  },
  "Serbia": {
    "country_name": "Serbia",
    "country_code": "RS",
    "border_codes": ["AL", "BA", "BG", "HR", "HU", "ME", "MK", "RO"],
    "border_names": [
      "Albania",
      "Bosnia and Herzegovina",
      "Bulgaria",
      "Croatia",
      "Hungary",
      "Montenegro",
      "North Macedonia",
      "Romania"
    ],
    "population": 6963764
  },
  "Russia": {
    "country_name": "Russia",
    "country_code": "RU",
    "border_codes": [
      "AZ",
      "BY",
      "CN",
      "EE",
      "FI",
      "GE",
      "KZ",
      "KP",
      "LV",
      "LT",
      "MN",
      "NO",
      "PL",
      "UA"
    ],
    "border_names": [
      "Azerbaijan",
      "Belarus",
      "China",
      "Estonia",
      "Finland",
      "Georgia",
      "Kazakhstan",
      "North Korea",
      "Latvia",
      "Lithuania",
      "Mongolia",
      "Norway",
      "Poland",
      "Ukraine"
    ],
    "population": 144478050
  },
  "Rwanda": {
    "country_name": "Rwanda",
    "country_code": "RW",
    "border_codes": ["BI", "CD", "TZ", "UG"],
    "border_names": [
      "Burundi",
      "Congo (the Democratic Republic of the)",
      "Tanzania (the United Republic of)",
      "Uganda"
    ],
    "population": 12301939
  },
  "Saudi Arabia": {
    "country_name": "Saudi Arabia",
    "country_code": "SA",
    "border_codes": ["IQ", "JO", "KW", "OM", "QA", "AE", "YE"],
    "border_names": [
      "Iraq",
      "Jordan",
      "Kuwait",
      "Oman",
      "Qatar",
      "United Arab Emirates",
      "Yemen"
    ],
    "population": 33699947
  },
  "Solomon Islands": {
    "country_name": "Solomon Islands",
    "country_code": "SB",
    "border_codes": [""],
    "border_names": [""],
    "population": 652858
  },
  "Seychelles": {
    "country_name": "Seychelles",
    "country_code": "SC",
    "border_codes": [""],
    "border_names": [""],
    "population": 96762
  },
  "Sudan": {
    "country_name": "Sudan",
    "country_code": "SD",
    "border_codes": ["CF", "TD", "EG", "ET", "ER", "LY", "SS"],
    "border_names": [
      "Central African Republic",
      "Chad",
      "Egypt",
      "Ethiopia",
      "Eritrea",
      "Libya",
      "South Sudan"
    ],
    "population": 41801533
  },
  "Sweden": {
    "country_name": "Sweden",
    "country_code": "SE",
    "border_codes": ["FI", "NO"],
    "border_names": ["Finland", "Norway"],
    "population": 10175214
  },
  "Singapore": {
    "country_name": "Singapore",
    "country_code": "SG",
    "border_codes": [""],
    "border_names": [""],
    "population": 5638676
  },
  "Saint Helena, Ascension and Tristan da Cunha": {
    "country_name": "Saint Helena, Ascension and Tristan da Cunha",
    "country_code": "SH",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Slovenia": {
    "country_name": "Slovenia",
    "country_code": "SI",
    "border_codes": ["AT", "HR", "HU", "IT"],
    "border_names": ["Austria", "Croatia", "Hungary", "Italy"],
    "population": 2073894
  },
  "Svalbard and Jan Mayen": {
    "country_name": "Svalbard and Jan Mayen",
    "country_code": "SJ",
    "border_codes": [""],
    "border_names": [""],
    "population": 2572
  },
  "Slovakia": {
    "country_name": "Slovakia",
    "country_code": "SK",
    "border_codes": ["AT", "CZ", "HU", "PL", "UA"],
    "border_names": ["Austria", "Czechia", "Hungary", "Poland", "Ukraine"],
    "population": 5446771
  },
  "Sierra Leone": {
    "country_name": "Sierra Leone",
    "country_code": "SL",
    "border_codes": ["GN", "LR"],
    "border_names": ["Guinea", "Liberia"],
    "population": 7650154
  },
  "San Marino": {
    "country_name": "San Marino",
    "country_code": "SM",
    "border_codes": ["IT"],
    "border_names": ["Italy"],
    "population": 33785
  },
  "Senegal": {
    "country_name": "Senegal",
    "country_code": "SN",
    "border_codes": ["GM", "GN", "GW", "ML", "MR"],
    "border_names": [
      "Gambia",
      "Guinea",
      "Guinea-Bissau",
      "Mali",
      "Mauritania"
    ],
    "population": 15854360
  },
  "Somalia": {
    "country_name": "Somalia",
    "country_code": "SO",
    "border_codes": ["DJ", "ET", "KE"],
    "border_names": ["Djibouti", "Ethiopia", "Kenya"],
    "population": 15008154
  },
  "Suriname": {
    "country_name": "Suriname",
    "country_code": "SR",
    "border_codes": ["BR", "GF", "GY"],
    "border_names": ["Brazil", "French Guiana", "Guyana"],
    "population": 575991
  },
  "South Sudan": {
    "country_name": "South Sudan",
    "country_code": "SS",
    "border_codes": ["CF", "CD", "ET", "KE", "SD", "UG"],
    "border_names": [
      "Central African Republic",
      "Congo (the Democratic Republic of the)",
      "Ethiopia",
      "Kenya",
      "Sudan",
      "Uganda"
    ],
    "population": 10975920
  },
  "Sao Tome and Principe": {
    "country_name": "Sao Tome and Principe",
    "country_code": "ST",
    "border_codes": [""],
    "border_names": [""],
    "population": 211028
  },
  "El Salvador": {
    "country_name": "El Salvador",
    "country_code": "SV",
    "border_codes": ["GT", "HN"],
    "border_names": ["Guatemala", "Honduras"],
    "population": 6420744
  },
  "Sint Maarten (Dutch part)": {
    "country_name": "Sint Maarten (Dutch part)",
    "country_code": "SX",
    "border_codes": ["MF"],
    "border_names": ["Saint Martin (French part)"],
    "population": 0
  },
  "Syria": {
    "country_name": "Syrian Arab Republic",
    "country_code": "SY",
    "border_codes": ["IQ", "IL", "JO", "LB", "TR"],
    "border_names": ["Iraq", "Israel", "Jordan", "Lebanon", "Turkey"],
    "population": 16906283
  },
  "Eswatini": {
    "country_name": "Eswatini",
    "country_code": "SZ",
    "border_codes": ["MZ", "ZA"],
    "border_names": ["Mozambique", "South Africa"],
    "population": 1136191
  },
  "Turks and Caicos Islands": {
    "country_name": "Turks and Caicos Islands",
    "country_code": "TC",
    "border_codes": [""],
    "border_names": [""],
    "population": 37665
  },
  "Chad": {
    "country_name": "Chad",
    "country_code": "TD",
    "border_codes": ["CM", "CF", "LY", "NE", "NG", "SD"],
    "border_names": [
      "Cameroon",
      "Central African Republic",
      "Libya",
      "Niger",
      "Nigeria",
      "Sudan"
    ],
    "population": 15477751
  },
  "French Southern Territories": {
    "country_name": "French Southern Territories",
    "country_code": "TF",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Togo": {
    "country_name": "Togo",
    "country_code": "TG",
    "border_codes": ["BJ", "BF", "GH"],
    "border_names": ["Benin", "Burkina Faso", "Ghana"],
    "population": 7889094
  },
  "Thailand": {
    "country_name": "Thailand",
    "country_code": "TH",
    "border_codes": ["KH", "LA", "MY", "MM"],
    "border_names": ["Cambodia", "Laos", "Malaysia", "Myanmar"],
    "population": 69428524
  },
  "Tajikistan": {
    "country_name": "Tajikistan",
    "country_code": "TJ",
    "border_codes": ["AF", "CN", "KG", "UZ"],
    "border_names": ["Afghanistan", "China", "Kyrgyzstan", "Uzbekistan"],
    "population": 9100837
  },
  "Tokelau": {
    "country_name": "Tokelau",
    "country_code": "TK",
    "border_codes": [""],
    "border_names": [""],
    "population": 1411
  },
  "Timor-Leste": {
    "country_name": "Timor-Leste",
    "country_code": "TL",
    "border_codes": ["ID"],
    "border_names": ["Indonesia"],
    "population": 1267972
  },
  "Turkmenistan": {
    "country_name": "Turkmenistan",
    "country_code": "TM",
    "border_codes": ["AF", "IR", "KZ", "UZ"],
    "border_names": [
      "Afghanistan",
      "Iran (Islamic Republic of)",
      "Kazakhstan",
      "Uzbekistan"
    ],
    "population": 5850908
  },
  "Tunisia": {
    "country_name": "Tunisia",
    "country_code": "TN",
    "border_codes": ["DZ", "LY"],
    "border_names": ["Algeria", "Libya"],
    "population": 11565204
  },
  "Tonga": {
    "country_name": "Tonga",
    "country_code": "TO",
    "border_codes": [""],
    "border_names": [""],
    "population": 103197
  },
  "Turkey": {
    "country_name": "Turkey",
    "country_code": "TR",
    "border_codes": ["AM", "AZ", "BG", "GE", "GR", "IR", "IQ", "SY"],
    "border_names": [
      "Armenia",
      "Azerbaijan",
      "Bulgaria",
      "Georgia",
      "Greece",
      "Iran (Islamic Republic of)",
      "Iraq",
      "Syrian Arab Republic"
    ],
    "population": 82319724
  },
  "Trinidad and Tobago": {
    "country_name": "Trinidad and Tobago",
    "country_code": "TT",
    "border_codes": [""],
    "border_names": [""],
    "population": 1389858
  },
  "Tuvalu": {
    "country_name": "Tuvalu",
    "country_code": "TV",
    "border_codes": [""],
    "border_names": [""],
    "population": 11508
  },
  "Taiwan (Province of China)": {
    "country_name": "Taiwan (Province of China)",
    "country_code": "TW",
    "border_codes": [""],
    "border_names": [""],
    "population": 0
  },
  "Tanzania (the United Republic of)": {
    "country_name": "Tanzania (the United Republic of)",
    "country_code": "TZ",
    "border_codes": ["BI", "CD", "KE", "MW", "MZ", "RW", "UG", "ZM"],
    "border_names": [
      "Burundi",
      "Congo (the Democratic Republic of the)",
      "Kenya",
      "Malawi",
      "Mozambique",
      "Rwanda",
      "Uganda",
      "Zambia"
    ],
    "population": 56318348
  },
  "Ukraine": {
    "country_name": "Ukraine",
    "country_code": "UA",
    "border_codes": ["BY", "HU", "MD", "PL", "RO", "RU", "SK"],
    "border_names": [
      "Belarus",
      "Hungary",
      "Moldova (the Republic of)",
      "Poland",
      "Romania",
      "Russia",
      "Slovakia"
    ],
    "population": 44622516
  },
  "Uganda": {
    "country_name": "Uganda",
    "country_code": "UG",
    "border_codes": ["CD", "KE", "RW", "SS", "TZ"],
    "border_names": [
      "Congo (the Democratic Republic of the)",
      "Kenya",
      "Rwanda",
      "South Sudan",
      "Tanzania (the United Republic of)"
    ],
    "population": 42723139
  },
  "United States Minor Outlying Islands": {
    "country_name": "United States Minor Outlying Islands",
    "country_code": "UM",
    "border_codes": [""],
    "border_names": [""],
    "population": 300
  },
  "United States of America": {
    "country_name": "United States of America",
    "country_code": "US",
    "border_codes": ["CA", "MX"],
    "border_names": ["Canada", "Mexico"],
    "population": 326687501
  },
  "Uruguay": {
    "country_name": "Uruguay",
    "country_code": "UY",
    "border_codes": ["AR", "BR"],
    "border_names": ["Argentina", "Brazil"],
    "population": 3449299
  },
  "Uzbekistan": {
    "country_name": "Uzbekistan",
    "country_code": "UZ",
    "border_codes": ["AF", "KZ", "KG", "TJ", "TM"],
    "border_names": [
      "Afghanistan",
      "Kazakhstan",
      "Kyrgyzstan",
      "Tajikistan",
      "Turkmenistan"
    ],
    "population": 32955400
  },
  "Holy See": {
    "country_name": "Holy See",
    "country_code": "VA",
    "border_codes": ["IT"],
    "border_names": ["Italy"],
    "population": 825
  },
  "Saint Vincent and the Grenadines": {
    "country_name": "Saint Vincent and the Grenadines",
    "country_code": "VC",
    "border_codes": [""],
    "border_names": [""],
    "population": 110210
  },
  "Venezuela (Bolivarian Republic of)": {
    "country_name": "Venezuela (Bolivarian Republic of)",
    "country_code": "VE",
    "border_codes": ["BR", "CO", "GY"],
    "border_names": ["Brazil", "Colombia", "Guyana"],
    "population": 28870195
  },
  "Virgin Islands (British)": {
    "country_name": "Virgin Islands (British)",
    "country_code": "VG",
    "border_codes": [""],
    "border_names": [""],
    "population": 29802
  },
  "Virgin Islands (U.S.)": {
    "country_name": "Virgin Islands (U.S.)",
    "country_code": "VI",
    "border_codes": [""],
    "border_names": [""],
    "population": 106977
  },
  "Viet Nam": {
    "country_name": "Viet Nam",
    "country_code": "VN",
    "border_codes": ["KH", "CN", "LA"],
    "border_names": ["Cambodia", "China", "Laos"],
    "population": 95540395
  },
  "Vanuatu": {
    "country_name": "Vanuatu",
    "country_code": "VU",
    "border_codes": [""],
    "border_names": [""],
    "population": 292680
  },
  "Wallis and Futuna": {
    "country_name": "Wallis and Futuna",
    "country_code": "WF",
    "border_codes": [""],
    "border_names": [""],
    "population": 15289
  },
  "Samoa": {
    "country_name": "Samoa",
    "country_code": "WS",
    "border_codes": [""],
    "border_names": [""],
    "population": 196130
  },
  "Yemen": {
    "country_name": "Yemen",
    "country_code": "YE",
    "border_codes": ["OM", "SA"],
    "border_names": ["Oman", "Saudi Arabia"],
    "population": 28498687
  },
  "Mayotte": {
    "country_name": "Mayotte",
    "country_code": "YT",
    "border_codes": [""],
    "border_names": [""],
    "population": 270372
  },
  "South Africa": {
    "country_name": "South Africa",
    "country_code": "ZA",
    "border_codes": ["BW", "LS", "MZ", "NA", "SZ", "ZW"],
    "border_names": [
      "Botswana",
      "Lesotho",
      "Mozambique",
      "Namibia",
      "Eswatini",
      "Zimbabwe"
    ],
    "population": 57779622
  },
  "Zambia": {
    "country_name": "Zambia",
    "country_code": "ZM",
    "border_codes": ["AO", "BW", "CD", "MW", "MZ", "NA", "TZ", "ZW"],
    "border_names": [
      "Angola",
      "Botswana",
      "Congo (the Democratic Republic of the)",
      "Malawi",
      "Mozambique",
      "Namibia",
      "Tanzania (the United Republic of)",
      "Zimbabwe"
    ],
    "population": 17351822
  },
  "Zimbabwe": {
    "country_name": "Zimbabwe",
    "country_code": "ZW",
    "border_codes": ["BW", "MZ", "ZA", "ZM"],
    "border_names": ["Botswana", "Mozambique", "South Africa", "Zambia"],
    "population": 14439018
  }
}

# combineData()
formatDataForNetwork(cleanData)