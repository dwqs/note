/**
 * Created by pomy on 05/05/2017.
 */

'use strict';

export let dateHelper = (time) => {
    let date = new Date(time);
    let y = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return `${y}/${month}/${d} ${h}:${m}`;
};
