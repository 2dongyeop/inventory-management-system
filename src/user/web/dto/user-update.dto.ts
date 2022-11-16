export class UserUpdateDto {
  username: string;
  password: string;
  updateUsername: string;

  getUpdateUsername(): object {
    return {
      username: this.updateUsername,
    };
  }
}
