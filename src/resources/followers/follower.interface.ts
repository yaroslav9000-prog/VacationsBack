import { Schema, Types } from 'mongoose';
export interface Follower{
    userId: Schema.Types.ObjectId,
    vacationsIDs: Schema.Types.ObjectId
}