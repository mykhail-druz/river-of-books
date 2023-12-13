import UserProfileForm from "@/app/_components/profile/user-profile-form";
import {getServerAuthSession} from "@/server/auth";
import {redirect} from "next/navigation";
import {getUserById} from "@/server/user";

const UserProfile = async () => {
    const status = await getServerAuthSession();
    if (!status) {
        // User unauthenticated, redirect to home
        redirect('/discover');
    }
    return <UserProfileForm user={await getUserById(parseInt(status.user.id))}/>
};

export default UserProfile;