import { AppContainer, Box, Header } from "@/components";

export default function Page() {
    return (
        <AppContainer inputPage>
            <Header>
                <button className="blue-gradient-text size-fit text-sm font-semibold">
                    Save
                </button>
            </Header>
            <div className="mt-10 flex flex-col">
                <h3 className="golden-text mb-3 text-sm font-bold">
                    Tell everyone about yourself
                </h3>
                <h2 className="mb-9 text-xl font-bold">What interest you?</h2>
                <Box className="min-h-12 bg-white-input">{/*  */}</Box>
            </div>
        </AppContainer>
    );
}
