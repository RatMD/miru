/**
 * Use Client Details
 * @returns
 */
export declare function useClient(): {
    width: import("vue").Ref<number>;
    height: import("vue").Ref<number>;
    orientation: import("vue").Ref<"landscape" | "portrait">;
    online: import("vue").Ref<boolean>;
    agent: import("vue").ShallowRef<string>;
    browser: import("vue").ShallowRef<string>;
    browserVersion: import("vue").ShallowRef<string>;
    browserMajorVersion: import("vue").ShallowRef<number>;
    cookies: import("vue").ShallowRef<boolean>;
    os: import("vue").ShallowRef<string>;
    osVersion: import("vue").ShallowRef<string>;
    isApple: import("vue").ShallowRef<boolean>;
    isLinux: import("vue").ShallowRef<boolean>;
    isWindows: import("vue").ShallowRef<boolean>;
    isMobile: import("vue").ShallowRef<boolean>;
};
