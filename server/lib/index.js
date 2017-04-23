/**
 * Created by pomy on 23/04/2017.
 */

'use strict';

let ignoreAuthPaths = [/\/create\//, /\/edit\/\d+$/, /\/login\//];

module.exports = {
    isNeedAuth: (path) => {
        for(let item in ignoreAuthPaths){
            if(item.test(path)){
                return true;
            }
        }
        return false;
    }
};
