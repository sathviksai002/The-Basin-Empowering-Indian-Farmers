import json

def read_json_file(file_path, encoding='utf-8'):
    with open(file_path, 'r', encoding=encoding) as file:
        data = json.load(file)
    return data

file_path = 'Lab test data.json' 
json_data = read_json_file(file_path)
dict = {}
for i in json_data:
    if i['States'] in dict:
        dict[i['States']].add(i['District'])
    else:
        dict[i['States']]={i['District']}

for i in dict:
    x = list(dict[i])
    dict[i] = x
str = json.dumps(dict)

file_path = 'stateData.json'

with open(file_path, 'w') as file:
    file.write(str)
