import "./src/styles/miru.css";
import "./.histoire/styles.css";
import { defineSetupVue3 } from "@histoire/plugin-vue";

import FilesizeDirective from './src/directives/filesize';
import OutsideDirective from "./src/directives/outside";

declare module "histoire" {
    interface CommonMeta {
        wrapper?: boolean;
    }
}

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {
    app.directive('filesize', FilesizeDirective);
    app.directive('click-outside', OutsideDirective);
});
