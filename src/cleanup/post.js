'use strict';

const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    if (process.env.INSTANCE_UUID) {
        core.info('Stopping Genymotion Cloud SaaS instance');
        try {
            await exec.exec(`gmsaas instances stop ${process.env.INSTANCE_UUID}`);
        } catch (error) {
            core.setFailed(error.message);
        }
    }

    try {
        core.info('Reset Genymotion SaaS authentication');
        await exec.exec('gmsaas auth reset');
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
