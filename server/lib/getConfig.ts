import cJSON from './../config.json';

import _debug from 'debug';

const debug = _debug('app:config');

debug(cJSON);

export default function () {
    return cJSON;
}
