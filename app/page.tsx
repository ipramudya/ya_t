import { AppContainer, Box, EditButton, Header, Icons } from "@/components";
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
            <Box className="flex min-h-[120px] flex-col justify-center gap-8 bg-brand-800">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Interest</h3>
                    <EditButton />
                </div>
                <p className="text-sm text-subtitle">
                    Add in your interest to find a better match
                </p>
            </Box>
        </AppContainer>
    );
}
