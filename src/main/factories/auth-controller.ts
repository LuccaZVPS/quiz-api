import { AuthController } from "../../../src/presentation/controllers/auth";
import { Controller } from "../../../src/presentation/protocols/controller";
import { EmailVerify } from "../../../src/data/useCases/email-verify";
import { AccountRepository } from "../../../src/infra/db/repositories/account/account-repository";
import { JWTAdapter } from "../../../src/infra/encrypter/jwtAdapter";
import { EmailValidatorAdapter } from "../../../src/infra/validators/email-validator";

export const makeAuthController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter();
  const jwtAdapter = new JWTAdapter();
  const accountRepository = new AccountRepository();
  const emailVerify = new EmailVerify(accountRepository);

  return new AuthController(emailValidator, emailVerify, jwtAdapter);
};
