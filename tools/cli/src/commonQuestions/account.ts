import inquirer from 'inquirer';

export interface IAccountToUse {
  accountToUse: 'alice' | 'personal';
}
export async function chooseAccount(): Promise<IAccountToUse> {
  const answers: IAccountToUse = await inquirer.prompt<IAccountToUse>([
    {
      name: 'accountToUse',
      message: 'Which account do you want to use to sign the transaction?',
      type: 'list',
      choices: [
        {
          key: 'withAlice',
          value: 'alice',
          name: 'Use Alice'
        },
        {
          key: 'withPersonal',
          value: 'personal',
          name: 'Use my personal account'
        }
      ]
    }
  ]);
  return answers;
}
