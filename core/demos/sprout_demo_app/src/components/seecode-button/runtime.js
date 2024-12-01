export default {
    events: {
        seeCodeButton(event, host, global) {
            //seeCodeOn is on the state of the component 
            // containing the seecode-button (example-block)
            const [seeCodeOn, state] = host.getState('seeCodeOn', true);
            state.seeCodeOn = seeCodeOn ? false : true;
        }
    }
}