import { AddAccount } from "../../../src/data/useCases/add-account";
import { AccountRepository } from "../../../src/infra/db/repositories/account/account-repository";
import { BcryptAdapter } from "../../../src/infra/encrypter/bcryptAdapter";
import { EmailValidatorAdapter } from "../../../src/infra/validators/email-validator";
import { SignUpController } from "../../../src/presentation/controllers/signup";
import { Controller } from "../../../src/presentation/protocols/controller";

export const makeSignupController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const addAccountRepository = new AccountRepository();
  const addAccount = new AddAccount(bcryptAdapter, addAccountRepository);
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    addAccount
  );
  return signUpController;
};
