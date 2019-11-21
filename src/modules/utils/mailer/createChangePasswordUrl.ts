import { v4 } from 'uuid'
import { redis } from '../../../redis'
import { userForgetPasswordPrefix } from '../../constants/redisPrefixes';

export const createChangePasswordUrl = async (userId: number) => {
    const tokenId = v4();
    await redis.set(userForgetPasswordPrefix + tokenId,userId, "expire", 60 * 60 * 24)

    return `http://localhost:3000/user/change-password/${tokenId}`;
}