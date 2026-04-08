export function getStateMapArrayIterator(stateMapArray) {
    return {
        index: -1,
        next() {
            if (this.index === stateMapArray.length) {
                return { value: null, done: true };
            }
            let item = stateMapArray[++this.index];
            if (!item) return { value: null, done: true }
            if (Object.hasOwn(item, 'state')) item = item.state;
            return { value: item, done: false } 
        },
        getFrom(index) {
            if (index === stateMapArray.length) {
                return { value: null, done: true };
            }
            let item = stateMapArray[index];
            if (Object.hasOwn(item, 'state')) item = item.state;
            return { value: item, done: false } 
        },
        reset() {
            this.index = -1;
        },
    }
}