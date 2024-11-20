import {
    AppContainer,
    Box,
    EditButton,
    Header,
    Icons,
    InterestSection
} from "@/components";
import { EditProfileSection } from "@/components/EditProfileSection";

export default function Home() {
    return (
        <AppContainer>
            <Header title="@johndoe">
                <button className="flex size-6 items-center justify-center">
                    <Icons.More />
                </button>
            </Header>
            <Box className="mb-6 flex min-h-[190px] items-end bg-brand-700">
                <h3 className="font-semibold">@johndoe123,</h3>
                <EditButton className="absolute right-3 top-3" />
            </Box>
            <EditProfileSection />
            <InterestSection />
        </AppContainer>
    );
}
