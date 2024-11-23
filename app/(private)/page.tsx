import {
    AppContainer,
    BannerProfile,
    HomeHeader,
    InterestSection
} from "@/components";
import { EditProfileSection } from "@/components/EditProfileSection";

export default function Home() {
    return (
        <AppContainer>
            <HomeHeader />
            <BannerProfile />
            <EditProfileSection />
            <InterestSection />
        </AppContainer>
    );
}
