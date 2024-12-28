
export class RoleStrategy {
    render(eventDetails:any)  {
        console.log(eventDetails);
        throw new Error("Method 'render()' must be implemented.");
    }
}
