export type Tables = 
    "users" | 
    "admins" | 
    "tokens" |
    "recoverycodes";

export const TableNames = {
    Users: "users",
    Admins: "admins",
    Tokens: "tokens",
    RecoveryCodes: "recoverycodes"
} as const;

