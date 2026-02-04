import { User } from "../entityInterface/userInterface";


// **** Used as the response type of the adminFetchAllUsers api
export type AdminfetchAllUsersResponse = Pick<User, "_id" | "username" | "email" | "isBlocked" | "isEmailVerified">;;


// **** Used as the request type of the adminChangeUserBlockStatus api
export type AdminChangeUserStatusRequest = {
    userId: User["_id"];
    isBlocked: User["isBlocked"];
}

// **** Used as the response type of admin fetch user profile details
export type AdminFetchUserProfileDetailsResponse = Pick<User, "username" | "phone" | "profileImage" | "isEmailVerified" | "isBlocked" | "email">;
