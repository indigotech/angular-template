/*
* Providers provided by Angular
*/
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {GuideModule} from './modules/guide.module';



const platform = platformBrowserDynamic();
platform.bootstrapModule(GuideModule);
