export let result = names.divisionNames.reduce((acc,val) => {
    return {...acc, [val.id]: {"name": val.area_name}}
}, {})