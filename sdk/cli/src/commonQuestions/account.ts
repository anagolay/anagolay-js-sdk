import inquirer from 'inquirer';

export interface IAccountToUse {
  accountToUse: 'alice' | 'personal';
}
export async function chooseAccount(): Promise<IAccountToUse> {
  const answers: IAccountToUse = await inquirer.prompt<IAccountToUse>([
    {
      name: 'accountToUse',
      message: 'Which chain you want to connect to?',
      type: 'list',
      choices: [
        {
          key: 'withAlice',
          value: 'alice',
          name: 'With Alice',
        },
        {
          key: 'withPersonal',
          value: 'personal',
          name: 'With my personal account',
        },
      ],
    },
  ]);
  return answers;
}
