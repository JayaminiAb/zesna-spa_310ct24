export interface OverallCookies {
    // ----------------------------- Setters ----------------------------- 
    SetUserToken(userToken: string): void;
    ClearCookies(): void;
    // ----------------------------- Getters ----------------------------- 
    GetUserToken(): string;
    GetUserFullName(): string;
    GetUserId(): string;
    GetUserEmail(): string;
    GetUserRole(): string;
    GetUserInitialToken(): string;
}