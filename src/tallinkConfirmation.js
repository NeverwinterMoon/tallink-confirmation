'use strict';

import { module } from 'angular';
import confirmationDirective from './tallinkConfirmation.directive';

export default module('tallink-confirmation', [])
  .directive('confirmation', confirmationDirective)
;
