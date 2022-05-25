import inquirer from 'inquirer';

import { createSettingsFile, ISettings, readSettingsFile } from '$src/utils';
/**
 * Interface for the Starter questions
 */
export interface IStartQuestions extends ISettings {
  proceedWithPublish: boolean;
}
/**
 * Ask most common questions and collect answers
 *
 * See {@link IStartQuestions} for the structure
 * @returns the answers to the questions.
 */
export async function askStarterQuestions(): Promise<void> {
  const { disableStartupQuestions, fts } = await readSettingsFile();

  if (disableStartupQuestions) {
    return;
  }

  const startAnswers: IStartQuestions = await inquirer.prompt<IStartQuestions>([
    {
      type: 'confirm',
      name: 'proceedWithPublish',
      message: 'Do you want to proceed?',
      default: true,
    },
    // {
    //   type: 'confirm',
    //   name: 'enableTelemetry',
    //   message: 'Do you want to enable telemetry?',
    //   default: true,
    // },
    {
      type: 'confirm',
      name: 'disableStartupQuestions',
      message: 'Do you want to disable startup questions?',
      default: false,
    },
  ]);

  await createSettingsFile({
    fts: fts || true,
    disableStartupQuestions: startAnswers.disableStartupQuestions,
    // enableTelemetry: startAnswers.enableTelemetry,
  });

  return;
}
