export class ReadonlySet extends Set {
	static unavailableMethod(methodName) {
  	    throw Error(`Can't use ${methodName} in ReadonlySet`);
    }

    constructor(iterable) {
  	    super(iterable);
        // We need to set it here, because the native constructor calls 'add'
        this.add = ()=> ReadonlySet.unavailableMethod("add");
    }
	delete() {
		ReadonlySet.unavailableMethod("delete");  	
    }
	clear() {
		ReadonlySet.unavailableMethod("clear");  	
    }
}
