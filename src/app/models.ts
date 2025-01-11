export interface User {
    id: string;
    email: string;
    password: string;
    username: string;
    countryOfResidence: string;
    role: string;
    status: string;
    activationToken: string;
    balance: number;
    profilePic: string;
}

export interface Game {
    id: string;
    name: string;
    description: string;
    genre: string;
    price: number;
    minimumSupportedOS: string;
    minimumSupportedGraphicsCard: string;
    minimumSupportedProcessor: string;
    minimumSupportedMemory: string;
    storage: string;
    picOne: string;
    picTwo: string;
    picThree: string;
}

export interface Trophy {
    id: string;
    gameId: string;
    name: string;
    description: string;
    iconUrl: string;
}

export interface Possession {
    id: string;
    gameId: string;
    userId: string;
}