import { getRequest } from './axios'

export async function getUsers() {
    try{
        const users = await getRequest('users');
        return users;
    } catch( error ) {
        /**
         * TODO
         * Handle error in axios response interceptor
         */
        return null;
    }
}