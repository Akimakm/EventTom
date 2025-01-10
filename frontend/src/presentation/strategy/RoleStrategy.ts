import { JSX } from "react";


export abstract class RoleStrategy {

    abstract renderDetails(eventDetails:any, state?: any, handlers?: any): JSX.Element;
    abstract renderHome({toggleNotifications, showNotifications, notifications,}: { toggleNotifications: () => void; showNotifications: boolean; notifications: string[]; }): JSX.Element;
}
