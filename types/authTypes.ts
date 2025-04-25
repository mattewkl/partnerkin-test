export type UserDataType = {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    socialLinks: {
      name: string;
      url: string;
      icon: string;
    }[];
}
