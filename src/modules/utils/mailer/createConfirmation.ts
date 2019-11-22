import { v4 } from 'uuid'
import { redis } from '../../../redis'
import { userEmailConfirmationPrefix } from '../../constants/redisPrefixes';

export const createConfirmationUrl = async (userId: number) => {
    const tokenId = v4();
    await redis.set(userEmailConfirmationPrefix + tokenId, userId, "ex", 60 * 60 * 24)

    return `http://localhost:3000/user/confirm/${tokenId}`;
}