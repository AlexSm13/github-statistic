export class UserInfo {
    name: string;
    bio: string;

    constructor(data: any) {
        this.name = data.name;
        this.bio = data.bio;
    }
}
