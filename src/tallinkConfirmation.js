'use strict';

import { module } from 'angular';
import TallinkConfirmationDirective from './tallinkConfirmation.directive';

export default module('tallink-confirmation', [])
  .directive('confirmation', () => new TallinkConfirmationDirective)
;
