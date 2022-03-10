import inquirer from 'inquirer';

/**
 * Interface for the Starter questions
 */
export interface IStartQuestions {
  proceedWithPublish: boolean;
  enableTelemetry: boolean;
  disableStartupQuestions: boolean;
}
/**
 * Ask most common questions and collect answers
 *
 * @param disableDefaultBehavior - Setting this to `true` will disable the default reaction to specific answers. Like `process.exit(0)` when `proceedWithPublish` is answered with No
 *
 * See {@link IStartQuestions} for the structure
 * @returns the answers to the questions.
 */
export async function askStarterQuestions(disableDefaultBehavior: boolean = false): Promise<IStartQuestions> {
  const startAnswers = await inquirer.prompt<IStartQuestions>([
    {
      type: 'confirm',
      name: 'proceedWithPublish',
      message: 'Do you want to proceed?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'enableTelemetry',
      message: 'Do you want to enable telemetry?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'disableStartupQuestions',
      message: 'Do you want to disable startup questions?',
      default: false,
    },
  ]);

  // if the default behavior is disabled
  if (!disableDefaultBehavior) {
    const { proceedWithPublish } = startAnswers;
    if (!proceedWithPublish) {
      process.exit(0);
    }
  }

  return startAnswers;
}
