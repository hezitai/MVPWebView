import request from "../../utils/requests.js";
export default {
    /**
     * 获取最新任务信息
     */
    async getCurrentJob() {
        let _this = this;
        let result = await request({
            url: "/job/get_current_job",
            method: "get"
        });
        try {
            window.clearInterval(_this.setinterval);
            if (result.data.length > 0) {
                _this.missionForm = {
                    missionName: result.data[0].jobName,
                    missionType: result.data[0].jobMode,
                    missionStatus: result.data[0].jobStatus,
                    timesThrowSec: result.data[0].intervalTime,
                    securityDeepMet: result.data[0].safeDeep,
                    settingDepth: result.data[0].setDeep,
                    settingThrowTimes: result.data[0].dropTimes == -1 ? '无限次' : result.data[0].dropTimes,
                    thisSettingThrowTimes: result.data[0].runTimes
                };
                _this.realTimeJobId = result.data[0].jobId;
                _this.getRealtimeJob(_this.realTimeJobId)
            } else {
                _this.setinterval = window.setInterval(() => {
                    _this.getCurrentJob()
                }, 1000);
            }
        } catch (error) {
            console.error(error);
        }
    },
    /**
     * 获取当前任务信息
     */
    async getRealtimeJob(jobId) {
        let _this = this;
        let result = await request({
            url: "/job/get_job_realdata",
            method: "get",
            params: {
                jobId: jobId,
            }
        });
        try {
            window.clearInterval(_this.setinterval1);
            if (result.data.length != 0) {
                _this.missionForm = {
                    missionName: result.data[0].jobName,
                    missionType: result.data[0].jobMode,
                    missionStatus: result.data[0].jobStatus,
                    timesThrowSec: result.data[0].intervalTime,
                    securityDeepMet: result.data[0].safeDeep,
                    settingDepth: result.data[0].setDeep,
                    settingThrowTimes: result.data[0].dropTimes == -1 ? '无限次' : result.data[0].dropTimes,
                    thisSettingThrowTimes: result.data[0].runTimes
                }
                if (result.data[0].jobStatus >= 768) {
                    // if (_this.userlevel == 0) {
                    //     _this.si = window.setInterval(() => {
                    //         _this.exportFile(jobId)
                    //     }, 1000)
                    // }
                    _this.getCurrentJob();
                } else {
                    _this.setinterval1 = window.setInterval(() => {
                        _this.getRealtimeJob(_this.realTimeJobId);
                    }, 1000)
                }
            } else {

            }
        } catch (error) {
            console.error(error);
        }
    },
    /**
     * 获取ishow 
     * */
    async getishow() {
        let _this = this;
        let result = await request({
            url: "sys-define/get_ishow_define",
            method: "get"
        });
        try {
            _this.formArray = JSON.parse(JSON.stringify(result.data));
        } catch (error) {
            console.error(error);
        }
    },
    /**
     * 获取仪器实时数据
     */
    async getApparatusData(row) {
        let _this = this;
        let result = await request({
            url: "realtime",
            method: "get",
            params: {
                start_time: row.thisTimes,
                limit: row.limit,
            }
        });
        try {
            if (result.data.length > 0) {
                let resultUseCharts = JSON.parse(JSON.stringify(result));
                // 获取时间
                _this.apparatusForm = {
                    getDataTime: result.data[0].timeTag,
                };
                _this.thisApparatusTimes = result.data[0].timeTag;

                let resultdata = result.data[0]
                    // input框赋值
                for (let i in _this.formArray) {
                    for (let j in resultdata) {
                        if (_this.formArray[i].fieldName == j) {
                            _this.formArray[i].vals = resultdata[j];
                        }

                    }
                };
                // console.log(_this.formArray)
                _this.thisApparatuslimit = '';
            }
        } catch (error) {
            console.error(error);
        }
    },
    /**
     * 获取wshow
     * */
    async getwshow() {
        let _this = this;
        let result = await request({
            url: "sys-define/get_wshow_define",
            method: "get"
        });
        try {
            _this.formArrayWinch = JSON.parse(JSON.stringify(result.data));
        } catch (error) {
            console.error(error);
        }
    },
    /**
     * 获取绞车实时数据
     * */
    async getWinchData(row) {
        let _this = this;
        let result = await request({
            url: "winch/get_realdata",
            method: "get",
            params: {
                start_time: row.thisTimes,
                limit: row.limit,
            }
        });
        try {
            /**
             * 初始化Echarts  X轴
             */
            if (result.data.length > 0) {
                let resultUseCharts = JSON.parse(JSON.stringify(result))
                let resultUseCharts1 = JSON.parse(JSON.stringify(result))
                for (let i in resultUseCharts.data[0]) {
                    if (typeof resultUseCharts.data[0][i] == 'number') {
                        resultUseCharts.data[0][i] = resultUseCharts.data[0][i] == null ? 0 : resultUseCharts.data[0][i].toFixed(2)
                    }
                }

                // 获取时间
                _this.winchForm = {
                    getDataTime: result.data[0].timeTag,
                };
                _this.thisWinchTimes = result.data[0].timeTag;

                let resultdata = result.data[0]
                    // input框赋值
                for (let i in _this.formArrayWinch) {
                    for (let j in resultdata) {
                        if (_this.formArrayWinch[i].fieldName == j) {
                            _this.formArrayWinch[i].vals = resultdata[j];
                        }

                    }
                };
                for (let i in resultUseCharts1.data[0]) {
                    for (let j in _this.checkboxarray) {
                        for (let k in _this.checkboxarray[j].arr) {
                            if (i == _this.checkboxarray[j].arr[k].fieldName) {
                                _this.checkboxarray[j].arr[k].value = resultUseCharts1.data[0][i]
                            }
                        }
                    }
                }
                for (let y = 0; y < _this.checkboxarray.length; y++) {
                    for (let u = 0; u < _this.checkboxarray[y].arr.length; u++) {
                        for (let p = 0; p < _this.checkboxarray[y].arr[u].array.length; p++) {
                            _this.checkboxarray[y].arr[u].array[p].checked = false;
                            if ((_this.checkboxarray[y].arr[u].value & _this.checkboxarray[y].arr[u].array[p].dataValue) > 0) {
                                _this.checkboxarray[y].arr[u].array[p].checked = true
                            }
                        }
                    }
                }
                // console.log(_this.checkboxarray)
            }
        } catch (error) {
            console.error(error);
        }
    },
    async getStatusDefine() {
        let _this = this;
        let result = await request({
            url: "winch/get_status_define",
            method: "get"
        });
        try {
            _this.checkboxarray = [];
            let b = [];
            let c = [];
            for (let i in result.data) {
                if (b.indexOf(result.data[i].dataType) == -1) {
                    b.push(result.data[i].dataType)
                }
                if (c.indexOf(result.data[i].fieldName) == -1) {
                    c.push(result.data[i].fieldName)
                }
            }
            for (let o = 0; o < b.length; o++) {
                let a = {
                    name: '',
                    arr: [],
                    dataType: '',
                };
                _this.checkboxarray.push(a)
            }
            for (let i = 0; i < b.length; i++) {
                for (let j = 0; j < result.data.length; j++) {
                    if (b[i] == result.data[j].dataType) {
                        _this.checkboxarray[i].dataType = result.data[j].dataType;
                        if (_this.checkboxarray[i].name == '') {
                            _this.checkboxarray[i].name = result.data[j].fieldName + ' System'
                        }
                        _this.checkboxarray[i].arr.push(result.data[j])
                    }
                }
            }
            let aaa = [];
            for (let i in c) {
                let bbb = {
                    name: c[i],
                    array: [],
                    value: 0,
                    dataType: '',
                };
                aaa.push(bbb)
            }
            for (let i = 0; i < _this.checkboxarray.length; i++) {
                for (let j = 0; j < _this.checkboxarray[i].arr.length; j++) {
                    for (let k in aaa) {
                        if (aaa[k].name == _this.checkboxarray[i].arr[j].fieldName) {
                            aaa[k].array.push(_this.checkboxarray[i].arr[j]);
                            aaa[k].dataType = _this.checkboxarray[i].arr[j].dataType
                        }
                    }

                }
            }
            for (let i = 0; i < _this.checkboxarray.length; i++) {
                _this.checkboxarray[i].arr = [];
                for (let j = 0; j < aaa.length; j++) {
                    if (_this.checkboxarray[i].dataType == aaa[j].dataType) {
                        for (let k in aaa[j].array) {
                            aaa[j].array[k].checked = false
                        }
                        _this.checkboxarray[i].arr.push({
                            array: aaa[j].array,
                            value: 0,
                            fieldName: aaa[j].name,
                            dataType: aaa[j].dataType,
                        })
                    }
                }
            }
            _this.readyRenderCheckboxData = true
        } catch (error) {
            console.error(error);
        }
    },
    async getAlarmRealtime(row) {
        let _this = this;
        let result = await request({
            url: "/sys-define/get_alarm_realtime",
            method: "get",
            params: {
                start_time: row.time,
                limit: row.limit,
                // limit: '',
            },
        });
        try {
            if (result.data.length > 0) {
                if (row.time != '') {
                    document.getElementById('alerttab').classList.add('alerttab');
                    for (let i in result.data) {
                        result.data[i].timeTags = new Date(result.data[i].timeTag).getFullYear() + '-' + (new Date(result.data[i].timeTag).getMonth() + 1 < 10 ? '0' + (new Date(result.data[i].timeTag).getMonth() + 1) : new Date(result.data[i].timeTag).getMonth() + 1) + '-' + (new Date(result.data[i].timeTag).getDate() < 10 ? '0' + new Date(result.data[i].timeTag).getDate() : new Date(result.data[i].timeTag).getDate()) + ' ' + (new Date(result.data[i].timeTag).getHours() < 10 ? '0' + new Date(result.data[i].timeTag).getHours() : new Date(result.data[i].timeTag).getHours()) + ':' + (new Date(result.data[i].timeTag).getMinutes() < 10 ? '0' + new Date(result.data[i].timeTag).getMinutes() : new Date(result.data[i].timeTag).getMinutes()) + ':' + (new Date(result.data[i].timeTag).getSeconds() < 10 ? '0' + new Date(result.data[i].timeTag).getSeconds() : new Date(result.data[i].timeTag).getSeconds());
                        _this.alertArray.unshift(result.data[i]);
                    }
                } else {
                    for (let i in result.data) {
                        result.data[i].timeTags = new Date(result.data[i].timeTag).getFullYear() + '-' + (new Date(result.data[i].timeTag).getMonth() + 1 < 10 ? '0' + (new Date(result.data[i].timeTag).getMonth() + 1) : new Date(result.data[i].timeTag).getMonth() + 1) + '-' + (new Date(result.data[i].timeTag).getDate() < 10 ? '0' + new Date(result.data[i].timeTag).getDate() : new Date(result.data[i].timeTag).getDate()) + ' ' + (new Date(result.data[i].timeTag).getHours() < 10 ? '0' + new Date(result.data[i].timeTag).getHours() : new Date(result.data[i].timeTag).getHours()) + ':' + (new Date(result.data[i].timeTag).getMinutes() < 10 ? '0' + new Date(result.data[i].timeTag).getMinutes() : new Date(result.data[i].timeTag).getMinutes()) + ':' + (new Date(result.data[i].timeTag).getSeconds() < 10 ? '0' + new Date(result.data[i].timeTag).getSeconds() : new Date(result.data[i].timeTag).getSeconds());
                        _this.alertArray.push(result.data[i]);
                    }
                }
                _this.thisAlertTime = result.data[0].timeTag;
                console.log(result.data[0].timeTag);
                _this.thisAlertlimit = '';
            }
        } catch (error) {}
    },
    clicktabs(name) {
        // console.log(name);
        if (name == 3) {
            document.getElementById('alerttab').classList.remove('alerttab');
        }
    },
    getDataSec() {
        let _this = this;
        window.clearInterval(_this.apparatusSetInterval);
        _this.apparatusSetInterval = setInterval(() => {
            _this.getApparatusData({
                thisTimes: _this.thisApparatusTimes,
                limit: _this.thisApparatuslimit
            })
        }, 1000)
    },
    getWinchDataSec() {
        let _this = this;
        window.clearInterval(_this.winchSetInterval);
        _this.winchSetInterval = setInterval(() => {
            _this.getWinchData({
                thisTimes: _this.thisWinchTimes,
                limit: _this.thisWinchlimit
            })
        }, 1000)
    },
    getAlert() {
        let _this = this;
        window.clearInterval(this.alertSetInterval);
        this.alertSetInterval = window.setInterval(() => {
            _this.getAlarmRealtime({
                time: _this.thisAlertTime,
                limit: _this.thisAlertlimit,
            });
        }, 1000);
    },
}