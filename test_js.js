const dict = [
    { "name": "Anna", "level": null, "nested": {"inner": null} },
    {"name": "Nora", "level": null, "nested": {"inner": null} },
    {"name": "Cory", "level": 1, "nested": {"inner": 7} },
    {"name": "Xander", "level": 7, "nested": {"inner": 5} },
    {"name": "Hilda", "level": 9, "nested": {"inner": 100} },
    {"name": "Betty", "level": 9, "nested": {"inner": null} },
    {"name": "Zara", "level": 5, "nested": {"inner": null} }
]

function sortByStrField(field, sortBy) {
    dict.sort((a, b) => a[field].localeCompare(b[field]))

    console.log(dict)
}


function sortByNumField(field1, field2) {
    dict.sort((a, b) => b[field1][field2] - a[field1][field2])

    console.log(dict)
}
sortByNumField('nested', 'inner')