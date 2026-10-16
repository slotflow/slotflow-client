export interface SlotEngageRequest {
  providerId: string;
  date: Date;
  slotId: string;
}

export type VideoRoomParticipant = {
  id: string;
  user?: {
    id?: string;
    name?: string;
    profileImage?: string;
  };
};

export type VideoRoomStatePayload = {
  roomId: string;
  users: VideoRoomParticipant[];
};
