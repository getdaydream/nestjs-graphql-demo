import { Service } from 'egg';
import { getMongoManager } from 'typeorm';
import { User } from '../entity/user';

/**
 * User service
 */
export default class UserServie extends Service {

    /**
     * create a user
     */
    public async create(email, password) {
        try {
            const user = new User();
            user.email = email;
            user.password = password;
            return await getMongoManager().save(user);
        } catch (e) {
            return e;
        }
    }

    /**
     * find user
     */
    public async find() {
        return await getMongoManager().find(User);
    }
}
