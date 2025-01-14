export type RootParaList = {
    Splash: undefined;
    Auth: { screen: 'Login' | 'Sign' };
    App: { screen: 'Home'};
}

export type Auth = {
    Sign: undefined;
    Login: undefined;
}

export type App = {
    Home: undefined;
    Upload: undefined;
    Document: undefined;
    Calender: undefined;
}