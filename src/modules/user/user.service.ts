import { User } from "./user.model";

export const getAllUsersService = async () => {
    try {
        const user = await User.find();
        return user;
    } catch (error) {
        throw new Error("Error fetching users");
    }

}