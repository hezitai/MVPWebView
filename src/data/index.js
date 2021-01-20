export default {
    active: 0,
    setinterval: null,
    setinterval1: null,
    missionForm: {
        missionName: `暂无任务信息`,
        missionType: ``,
        missionStatus: ``,
        timesThrowSec: `0`,
        securityDeepMet: `0`,
        settingDepth: `0`,
        settingThrowTimes: `0`,
        thisSettingThrowTimes: `0`
    },
    formArray: [],
    thisApparatusTimes: ``,
    thisApparatuslimit: 1,
    thisWinchTimes: ``,
    thisWinchlimit: 1,
    thisAlertTime: ``,
    thisAlertlimit: 1,
    apparatusForm: {
        getDataTime: ``
    },
    winchForm: {
        getDataTime: ``
    },
    apparatusSetInterval: null,
    winchSetInterval: null,
    alertSetInterval: null,
    formArrayWinch: [],
    checkboxarray: [{ arr: [{ array: [] }] }],
    alertArray: [],
}
// request({
//     url: "sys-define/get_ishow_define",
//     type: 'GET',
//     data: {
//         jobId: jobId,
//     },
//     dataType: 'json',
//     timeout: 200000,
//     contentType: "application/json",
//     success: function (result) {
//         result = JSON.parse(result)
//     },
//     error: function (e) {
//         console.log(e);
//     }
// })