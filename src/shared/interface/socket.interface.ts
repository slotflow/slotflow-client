export interface SlotEngageRequest {
    providerId: string;
    date: Date;
    slotId: string;
}

export enum EventSocketEnum {
    connect = "connect",
    reconnect = "reconnect",
    disconnect = "disconnect",
    subscriptionActivated = "subscription:activated",
    providerJoin = "provider:join",
    slotEngageRequest = "slot:engage:request",
    slotEngageRejected = "slot:engage:rejected",
    slotEngageApproved = "slot:engage:approved",
    providerLeave = "provider:leave",
    slotLocked = "slot:locked",
    slotUnlockRequest = "slot:unlock:request",
    slotUnlocked = "slot:unlocked"
}