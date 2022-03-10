// This file is part of Anagolay.

// Copyright (C) 2022 Anagolay Network.
// SPDX-License-Identifier: GPL-3.0-or-later WITH Classpath-exception-2.0

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

/**
 * A Utility library for anagolay js
 *
 * @remarks
 * We will re-export some of the packages that everbody will need.
 *
 * One of those libraries is `@polkadot/util` re-exported as `polkadot_util`.
 *
 * @packageDocumentation
 */

import * as polkadot_util from '@polkadot/util';

/**
 * Re-export Polkadot utils
 * @public
 */
export { polkadot_util };
export { isFalse, isTrue } from './booleans';
export { defaultExecOptions, exec, IExecOptions } from './exec';
export {
  allCommitsPushed,
  cloneRepo,
  gitCloneBare,
  IGitCloneBareOptions,
  IGitCloneOptions,
  isDirty,
  lastRevision,
  normalizeUrlPathname,
  parseURL,
  urlForRemote,
} from './git';
export { hexToString } from './hex/hex';
export { createFileLogger, createLogger, Logger } from './logger';
