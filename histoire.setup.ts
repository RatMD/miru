import "./src/styles/miru.css";
import { defineSetupVue3 } from "@histoire/plugin-vue";

declare module "histoire" {
    interface CommonMeta {
        wrapper?: boolean;
    }
}

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {

});
