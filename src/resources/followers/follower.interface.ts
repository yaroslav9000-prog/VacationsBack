import { Schema, Types } from 'mongoose';
export interface Follower{
    userId: string,
    vacationsIDs: Schema.Types.ObjectId[]
}