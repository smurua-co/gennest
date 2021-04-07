/* istanbul ignore file */
import './initialization';
import './event-server';
import './web-server/main';
import { application } from './application';

application.start();
