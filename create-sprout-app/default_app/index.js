const initState = {
    counter: 0,
    set_dynamicText: [function() { 
        return `This text is dynamic! \n It is bound to the 'dynamicText' State property.
        It can even use template strings, referencing another State value in them,
        like this counter: \n ${this.counter} \n`;
    }, ["counter"], true],
    list: [
        { key: 0 },
        { key: 2 },
        { key: 3 },

    ],
    isHidden: true,
    showSecond: false
}
this.setGlobalState(initState);