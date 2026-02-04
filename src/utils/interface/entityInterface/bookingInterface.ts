import { AppointmentStatus } from "../enums";

export interface ParticipantPresence {
    joined: boolean;
    joinedTime: string | null;
    leftCallTime: string | null;
}

export interface statusTrack {
    appointmentStatus: AppointmentStatus;
    time: string;
}

export interface Booking {
    _id: string;
    serviceProviderId: string;
    userId: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentMode: string;
    appointmentStatus: AppointmentStatus;
    slotId: string;
    paymentId: string;
    videoCallRoomId: string;
    onlineTrack: {
        user: ParticipantPresence;
        provider: ParticipantPresence;
    },
    statusTrack: statusTrack[],
    createdAt: string;
    updatedAt: string;
}