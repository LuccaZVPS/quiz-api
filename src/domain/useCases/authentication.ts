interface AuthenticationModel {
  email: string;
  password: string;
}
interface Authentication {
  auth: (account: AuthenticationModel) => Promise<string>;
}
