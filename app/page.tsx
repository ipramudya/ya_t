import { AppContainer, Box, EditButton, Header, Icons } from "@/components";

export default function Home() {
    return (
        <AppContainer>
            <Header title="@johndoe">
                <button className="flex size-6 items-center justify-center">
                    <Icons.More />
                </button>
            </Header>
            <Box className="bg-brand-700 mb-6 flex min-h-[190px] items-end">
                <h3 className="font-semibold">@johndoe123,</h3>
                <EditButton className="absolute right-3 top-3" />
            </Box>
            <Box className="bg-brand-800 mb-6 flex min-h-[120px] flex-col justify-center gap-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">About</h3>
                    <EditButton />
                </div>
                <p className="text-subtitle text-sm">
                    Add in your your to help others know you better
                </p>
            </Box>
            <Box className="bg-brand-800 flex min-h-[120px] flex-col justify-center gap-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Interest</h3>
                    <EditButton />
                </div>
                <p className="text-subtitle text-sm">
                    Add in your interest to find a better match
                </p>
            </Box>
        </AppContainer>
    );
}
