import { onMounted, onUnmounted, ref, shallowRef } from 'vue'

/**
 * Use Client Details
 * @returns 
 */
export function useClient() {
    const agent = shallowRef<string>();
    const browser = shallowRef<string>();
    const browserVersion = shallowRef<string>();
    const browserMajorVersion = shallowRef<number>();
    const cookies = shallowRef<boolean|null>();
    const os = shallowRef<string|null>();
    const osVersion = shallowRef<string|null>();
    const isApple = shallowRef<boolean>();
    const isLinux = shallowRef<boolean>();
    const isWindows = shallowRef<boolean>();
    const isMobile = shallowRef<boolean>();

    const width = ref<number>(0);
    const height = ref<number>(0);
    const orientation = ref<'portrait'|'landscape'>();
    const online = ref<boolean>(window.navigator.onLine);

    /**
     * Track width and height values
     */
    function update() {
        width.value = document.documentElement.clientWidth || window.outerWidth;
        height.value = document.documentElement.clientHeight || window.outerHeight;
        online.value = window.navigator.onLine;

        let isPortrait = false;
        if (typeof window.screen !== 'undefined' && typeof window.screen.orientation !== 'undefined') {
            isPortrait = window.screen.orientation.type.startsWith('portrait');
        } else {
            isPortrait = window.innerHeight > window.innerWidth;
        }
        orientation.value = isPortrait ? 'portrait' : 'landscape';
    }

    // Mounted
    onMounted(() => {
        let details = detectClientDetails();
        agent.value = details.agent;
        browser.value = details.browser;
        browserVersion.value = details.browserVersion;
        browserMajorVersion.value = details.browserMajorVersion;
        cookies.value = details.cookies;
        os.value = details.os;
        osVersion.value = details.osVersion;
        isApple.value = details.isApple;
        isLinux.value = details.isLinux;
        isWindows.value = details.isWindows;
        isMobile.value = details.isMobile;

        window.addEventListener('resize', update);
        window.addEventListener('online', update);
        window.addEventListener('offline', update);
        if (typeof window.screen !== 'undefined' && typeof window.screen.orientation !== 'undefined') {
            window.screen.orientation.addEventListener('change', update);
        } else {
            window.addEventListener('orientationchange', update);
        }

        update();
    });

    // Unmounted
    onUnmounted(() => {
        window.removeEventListener('resize', update);
        window.removeEventListener('online', update);
        window.removeEventListener('offline', update);
        if (typeof window.screen !== 'undefined' && typeof window.screen.orientation !== 'undefined') {
            window.screen.orientation.removeEventListener('change', update);
        } else {
            window.removeEventListener('orientationchange', update);
        }
    });

    // Export
    return { 
        width,
        height,
        orientation,
        online,
        agent,
        browser,
        browserVersion,
        browserMajorVersion,
        cookies,
        os,
        osVersion,
        isApple,
        isLinux,
        isWindows,
        isMobile
    };
};

/**
 * Detect client details.
 * @source https://stackoverflow.com/a/18706818
 * @returns 
 */
function detectClientDetails() {
    let agent = navigator.userAgent;
    let browser = navigator.appName;
    let version = parseFloat(navigator.appVersion).toString();

    // Detect Browser
    let offset, offset2;
    if ((offset = agent.indexOf('YaBrowser')) >= 0) {
        browser = 'Yandex';
        version = agent.substring(offset + 10);
    } else if ((offset = agent.indexOf('SamsungBrowser')) >= 0) {
        browser = 'Samsung';
        version = agent.substring(offset + 15);
    } else if ((offset = agent.indexOf('UCBrowser')) >= 0) {
        browser = 'UC Browser';
        version = agent.substring(offset + 10);
    } else if ((offset = agent.indexOf('OPR')) >= 0) {
        browser = 'Opera';
        version = agent.substring(offset + 4);
    } else if ((offset = agent.indexOf('Opera')) >= 0) {
        browser = 'Opera';
        if ((offset = agent.indexOf('Version')) >= 0) {
            version = agent.substring(offset + 8);
        } else {
            version = agent.substring(offset + 6);
        }
    } else if ((offset = agent.indexOf('Edge')) >= 0) {
        browser = 'Microsoft Legacy Edge';
        version = agent.substring(offset + 5);
    } else if ((offset = agent.indexOf('Edg')) >= 0) {
        browser = 'Microsoft Edge';
        version = agent.substring(offset + 4);
    } else if ((offset = agent.indexOf('MSIE')) >= 0) {
        browser = 'Microsoft Internet Explorer';
        version = agent.substring(offset + 5);
    } else if ((offset = agent.indexOf('Chrome')) >= 0) {
        browser = 'Chrome';
        version = agent.substring(offset + 7);
    } else if ((offset = agent.indexOf('Safari')) >= 0) {
        browser = 'Safari';
        if ((offset = agent.indexOf('Version')) >= 0) {
            version = agent.substring(offset + 8);
        } else {
            version = agent.substring(offset + 7);
        }
    } else if ((offset = agent.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = agent.substring(offset + 8);
    } else if (agent.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = agent.substring(agent.indexOf('rv:') + 3);
    } else if ((offset2 = agent.lastIndexOf(' ') + 1) < (offset = agent.lastIndexOf('/'))) {
        if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
        } else {
            browser = agent.substring(offset2, offset);
        }
        version = agent.substring(offset + 1);
    }

    // Parse Version
    let ix;    
    if ((ix = version.indexOf(';')) >= 0) {
        version = version.substring(0, ix);
    }
    if ((ix = version.indexOf(' ')) >= 0) {
        version = version.substring(0, ix);
    }
    if ((ix = version.indexOf(')')) >= 0) {
        version = version.substring(0, ix);
    }

    let browserVersion = parseFloat(version).toString();
    let browserMajorVersion = parseInt(version, 10);
    if (isNaN(browserMajorVersion)) {
        browserMajorVersion = parseInt(version, 10);
    }

    // Check for cookies
    let cookies: boolean | null = (navigator.cookieEnabled) ? true : false;
    if (typeof navigator.cookieEnabled == 'undefined') {
        cookies = null;
    }

    // Detect OS
    let os: null | string = null;
    let isApple: boolean = false;
    let isLinux: boolean = false;
    let isWindows: boolean = false;
    let isMobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(agent);
    for (const regex of OS_REGEXP) {
        if (regex.regexp.test(agent)) {
            os = regex.label;
            isApple = regex.apple || false;
            isLinux = regex.linux || false;
            isWindows = regex.windows || false;
            break;
        }
    }

    // Detect osVersion
    let osVersion: string | null = null;
    if (typeof os == 'string' && /Windows/.test(os)) {
        let temp = /Windows (.*)/.exec(os);
        osVersion = (temp && temp.length > 1) ? temp[1] : null;
    }
    switch (os) {
        case 'Mac OS':
        case 'Mac OS X':
        case 'Android':
            let temp1 = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(agent);
            osVersion = temp1 && temp1.length > 1 ? temp1[1] : null;
            break;
        case 'iOS':
            let temp2 = /OS (\d+)_(\d+)_?(\d+)?/.exec(agent) as string[];
            osVersion = temp2 && temp2.length > 1 ? `${temp2[1]}.${temp2[2] || 0}.${temp2[3] || 0}` : null;
            break;
    }

    // return;
    return {
        agent,
        browser,
        browserVersion,
        browserMajorVersion,
        cookies,
        os,
        osVersion,
        isApple,
        isLinux,
        isWindows,
        isMobile
    }
}

const OS_REGEXP = [
    {   
        label: 'Windows 10',
		regexp: /(Windows 10.0|Windows NT 10.0)/,
        windows: true
    },
    {   
        label: 'Windows 8.1',
		regexp: /(Windows 8.1|Windows NT 6.3)/,
        windows: true
    },
    {   
        label: 'Windows 8',
		regexp: /(Windows 8|Windows NT 6.2)/,
        windows: true
    },
    {   
        label: 'Windows 7',
		regexp: /(Windows 7|Windows NT 6.1)/,
        windows: true
    },
    {   
        label: 'Windows Vista',
		regexp: /Windows NT 6.0/,
        windows: true
    },
    {   
        label: 'Windows Server 2003',
		regexp: /Windows NT 5.2/,
        windows: true
    },
    {   
        label: 'Windows XP',
		regexp: /(Windows NT 5.1|Windows XP)/,
        windows: true
    },
    {   
        label: 'Windows 2000',
		regexp: /(Windows NT 5.0|Windows 2000)/,
        windows: true
    },
    {   
        label: 'Windows ME',
		regexp: /(Win 9x 4.90|Windows ME)/,
        windows: true
    },
    {   
        label: 'Windows 98',
		regexp: /(Windows 98|Win98)/,
        windows: true
    },
    {   
        label: 'Windows 95',
		regexp: /(Windows 95|Win95|Windows_95)/,
        windows: true
    },
    {   
        label: 'Windows NT 4.0',
		regexp: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
        windows: true
    },
    {   
        label: 'Windows CE',
		regexp: /Windows CE/,
        windows: true
    },
    {   
        label: 'Windows 3.11',
		regexp: /Win16/,
        windows: true
    },
    {   
        label: 'Android',
		regexp: /Android/,
        linux: true
    },
    {   
        label: 'Open BSD',
		regexp: /OpenBSD/,
        linux: true
    },
    {   
        label: 'Sun OS',
		regexp: /SunOS/,
        linux: true
    },
    {   
        label: 'Chrome OS',
		regexp: /CrOS/,
        linux: true
    },
    {   
        label: 'Linux',
		regexp: /(Linux|X11(?!.*CrOS))/,
        linux: true
    },
    {   
        label: 'iOS',
		regexp: /(iPhone|iPad|iPod)/,
        apple: true
    },
    {   
        label: 'Mac OS X',
		regexp: /Mac OS X/,
        apple: true
    },
    {   
        label: 'Mac OS',
		regexp: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
        apple: true
    },
    {   
        label: 'QNX',
		regexp: /QNX/
    },
    {   
        label: 'UNIX',
		regexp: /UNIX/
    },
    {   
        label: 'BeOS',
		regexp: /BeOS/
    },
    {   
        label: 'OS/2',
		regexp: /OS\/2/
    },
    {   
        label: 'Search Bot',
		regexp: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
    }
];
