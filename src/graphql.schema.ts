
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateUserInput {
    email: string;
    password: string;
    nickname: string;
}

export class LoginResult {
    user: User;
    token: string;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract me(): User | Promise<User>;

    abstract user(id: number): User | Promise<User>;

    abstract login(email: string, password: string): LoginResult | Promise<LoginResult>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: number;
    nickname: string;
}
