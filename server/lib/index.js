/**
 * Created by pomy on 23/04/2017.
 */

'use strict';

let ignoreAuthPaths = [/\/new\/?/, /\/edit\/\d+\/?/];

module.exports = {
    isNeedAuth: (path) => {
        for(let item in ignoreAuthPaths){
            if(ignoreAuthPaths[item].test(path)){
                return true;
            }
        }
        return false;
    }
};
