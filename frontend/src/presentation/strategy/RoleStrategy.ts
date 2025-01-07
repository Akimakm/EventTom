import { JSX } from "react";


export abstract class RoleStrategy {

    renderDetails(eventDetails:any): JSX.Element {
        console.log('eventDetails', eventDetails);
        throw new Error('render() must be implemented in the derived class');
    }
    renderHome() {
        throw new Error('renderHome() must be implemented in the derived class');
    }
}
