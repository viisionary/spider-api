export enum ParticipantRole { host, participant}

export interface Participant {
    userId: string;
    roomId: string;
    joinTime: Date;
    username: string,
    role: ParticipantRole
}
