const findEnum = (t, enumName) => {
    return t('enums:' + enumName, {returnObjects: true});
}

const findEnumValue = (t, enumName, value) => {
    return t('enums:' + enumName, {returnObjects: true}).filter(v => v.value === value)[0]?.name;
}

export default {findEnum, findEnumValue};