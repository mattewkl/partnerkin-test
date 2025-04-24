export type UserDataType = {
    id: number;
    name: string;
    email: string;
    password: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    socialLinks: Record<string, string>[];
}
