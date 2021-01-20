<template>
    <div id="index">
        <van-tabs v-model="active" sticky animated swipeable  @click='clicktabs'>
            <van-tab >
                <template #title>
                    <van-icon name="comment-o" />任务信息
                </template>
                <div class="mission-content">
                    <van-cell-group>
                        <van-cell title-style="width:2.45rem;flex:none" title="当前任务名称:" :value="missionForm.missionName" size="large" />
                        <van-cell title="当前任务模式:" size="large">
                            <template #right-icon>
                                <van-radio-group v-model="missionForm.missionType" disabled>
                                    <van-radio :name="5">定深投放</van-radio>
                                    <van-radio :name="80">距底定距离投放</van-radio>
                                </van-radio-group>
                            </template>
                        </van-cell>
                        <van-cell title="当前任务状态:" size="large">
                            <template #right-icon>
                                <van-radio-group v-model="missionForm.missionStatus" disabled>
                                    <van-radio :name="3">等待执行</van-radio>
                                    <van-radio :name="48">正在执行</van-radio>
                                    <van-radio :name="51">投放间隔等待<span style="display:inline-block;width:10px;height:10px">&nbsp;</span></van-radio>
                                    <van-radio :name="768">执行完成</van-radio>
                                    <van-radio :name="12288">已经取消</van-radio>
                                </van-radio-group>
                            </template>
                        </van-cell>
                        <van-cell title="每次投放间隔(秒):" :value="missionForm.timesThrowSec" size="large" />
                        <van-cell title="距底安全深度(米):" :value="missionForm.securityDeepMet" size="large" />
                        <van-cell title="设定深度(米):" :value="missionForm.settingDepth" size="large" />
                        <van-cell title="设定投放次数(次):" :value="missionForm.settingThrowTimes" size="large" />
                        <van-cell title="当前投放次数(次):" :value="missionForm.thisSettingThrowTimes" size="large" />
                    </van-cell-group>
                </div>
            </van-tab>
            <van-tab>
                <template #title>
                    <van-icon name="cluster-o" />仪器数据
                </template>
                <div class="apparatus-content">
                    <van-cell-group>
                        <van-cell title="数据时间" :value="apparatusForm.getDataTime" />
                        <van-cell v-for="(item, $index) in formArray" :key="$index" :title="item.dataUnit == null ? item.dataName : item.dataName + '(' + item.dataUnit + ')'">
                            <template #default>
                                {{item.vals | formatterDecimals}}
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div>
            </van-tab>
            <van-tab>
                <template #title>
                    <van-icon name="setting-o" />绞车信息
                </template>
                <div class="winch-content">
                    <van-cell-group>
                        <van-cell title="数据时间" :value="winchForm.getDataTime" />
                        <van-cell center title="绞车状态:" size="large">
                            <template #right-icon>
                                <div class="checkbox-content">
                                    <van-checkbox disabled v-for="(item, $index) in checkboxarray[0].arr[0].array" :key="$index" v-model="item.checked">{{item.dataDescription}}</van-checkbox>
                                </div>
                            </template>
                        </van-cell>
                        <van-cell v-for="(item, $index) in formArrayWinch" :key="$index" :title="item.dataUnit == null ? item.dataName : item.dataName + '(' + item.dataUnit + ')'">
                            <template #default>
                                {{item.vals | formatterDecimals}}
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div>
            </van-tab>
            <van-tab>
                <template #title>
                    <span id="alerttab">
                        <van-icon name="bulb-o" />报警信息
                    </span>
                </template>
                <div class="alert-content">
                    <van-cell-group></van-cell-group>
                    <van-grid :column-num="1">
                        <van-grid-item v-for="(item, $index) in alertArray" :key="$index">
                            <template #default>
                                <div v-if="alertArray.length > 0">
                                    <div class="grid-content">
                                        <span>报警时间：{{item.timeTags}}</span>
                                        <span>报警来源：{{item.dptName}}</span>
                                        <span>报警内容：{{item.alarmDescription}}</span>
                                    </div>
                                </div>
                            </template>
                        </van-grid-item>
                        <van-grid-item v-if="alertArray.length == 0">
                            <p class="emptyMsg">
                                暂无报警信息
                            </p>
                        </van-grid-item>
                    </van-grid>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import data from "../data/index.js"
import methods from "../methods/indexs.js"
export default {
    name: 'index',
    data() {
        return data
    },
    filters: {
        formatterDecimals(val) {
            if (val == null) {
                return 0
            } else if (val == 0) {
                return 0
            } else if (typeof val == 'string') {
                return val
            } else {
                return val.toFixed(4)
            }
        }
    },
    mounted() {
        this.getCurrentJob();
        this.getishow();
        this.getwshow();
        this.getStatusDefine()
        this.getDataSec();
        this.getWinchDataSec();
        this.getAlert();
    },
    methods: methods
}
</script>
<style scoped>
#index {
    width: 100%;
    height: 100%;
}
.van-tabs{
    width: 100%;
    height: 100%;
}
.van-tabs__content{
    width: 100%;
    height: calc(100% - 44px)
}
.van-cell {
    justify-content: space-around;
    align-items: baseline !important;
}
.van-cell__title {
    text-align: left;
}
.van-cell-group__title {
    text-align: left;
}
.van-radio {
    margin: 0.05rem 0;
}
.van-cell__value {
    font-size: 16px;
    color: #333333;
}
.van-checkbox {
    margin: 0.05rem 0;
}
.checkbox-content {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}
.van-checkbox__label--disabled {
    color: #333333;
}
.van-icon {
    vertical-align: middle;
    margin: 0 2px;
    line-height: 20px;
}
.alertList {
    padding: 0 0.2rem;
    margin-top: 0.2rem;
}
.grid-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
}
.grid-content span {
    display: inline-block;
    font-size: 0.3rem;
}
/* .van-grid-item__content--center{
    align-items: stretch!important;
} */
.emptyMsg {
    font-size: 0.3rem;
}
@-webkit-keyframes twinkling {
    /*透明度由0到1*/
    0% {
        opacity: 0.2; /*透明度为0*/
    }
    100% {
        opacity: 1; /*透明度为1*/
    }
}
.alerttab {
    color: red;
    -webkit-animation: twinkling 0.4s infinite linear;
}
</style>