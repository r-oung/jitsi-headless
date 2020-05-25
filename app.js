const puppeteer = require('puppeteer');

// Reference: https://code.saghul.net/tag/headless/
// Streams the first webcam in the system to the specified Jitsi Meet room. Audio is currently
// not sent, but it can be easily enabled by disabling the corresponding setting in `meetArgs`.
//
// TODO
//   - Detect if we are kicked from the room
//   - Support authenticated deployments
//
// NOTE: only tested on GNU/Linux.

async function main(room, baseUrl='https://meet.jit.si') {
    // Chromium command line flags
    // https://peter.sh/experiments/chromium-command-line-switches/
    const chromeArgs = [
        // Disable sandboxing, gives an error on Linux
        // '--no-sandbox',
        // '--disable-setuid-sandbox',
        // Automatically give permission to use media devices
        '--use-fake-ui-for-media-stream',
        // Silence all output, just in case
        '--alsa-output-device=plug:null',
	'--display=:1',
	'--no-sandbox',
	'--disable-extensions',
    ];

    // Jitsi Meet options
    // https://github.com/jitsi/lib-jitsi-meet/blob/master/doc/API.md
    // const meetArgs = [
        // Disable receiving of video
        // 'config.channelLastN=0',
        // Mute our audio
        // 'config.startWithAudioMuted=true',
        // Don't use simulcast to save resources on the sender (our) side
        // 'config.disableSimulcast=true',
        // No need to process audio levels
        // 'config.disableAudioLevels=true',
        // Disable P2P mode due to a bug in Jitsi Meet
        // 'config.p2p.enabled=false'
    // ];

    // const url = `${baseUrl}/${room}#${meetArgs.join('&')}`;
    const url = `${baseUrl}/${room}`;
    console.log(`Loading ${url}`);

    // Puppeteer launch options
    // https://github.com/puppeteer/puppeteer/blob/v3.0.1/docs/api.md#puppeteerlaunchoptions
    const browser = await puppeteer.launch({
	defaultViewport: {height: 1080, width: 1920},
        headless: false, // toggle for debugging
        args: chromeArgs,
	executablePath: '/usr/bin/chromium-browser',
        handleSIGINT: false
    });
    const page = await browser.newPage();

    // Manual handling on SIGINT to gracefully hangup and exit
    process.on('SIGINT', async () => {
        console.log('Exiting...');
        await page.evaluate('APP.conference.hangup();');
        await page.close();
        browser.close();
        console.log('Done!');
        process.exit();
    });

    await page.goto(url);

    // Mute audio
    await page.evaluate(`APP.conference.muteAudio(true);`);

    // Set some friendly display name
    await page.evaluate(`APP.conference.changeLocalDisplayName('Webcam');`);

    console.log('Running...');
}

main(process.argv[2] || 'temi-4164126087');
