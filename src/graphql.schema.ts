/* tslint:disable */
export abstract class IQuery {
    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: number;
    name?: string;
}
