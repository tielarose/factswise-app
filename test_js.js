const dict = [
    {"name": "Anna", "level": 6},
    {"name": "Nora", "level": 5},
    {"name": "Cory", "level": 1},
    {"name": "Xander", "level": 7},
    {"name": "Hilda", "level": 9},
    {"name": "Betty", "level": 9},
    {"name": "Zara", "level": 5}
]

function sortByField(field, sortBy) {
    dict.sort((a, b) => a[field].localeCompare(b[field]))

    console.log(dict)
}

sortByField('name', 'ascending')