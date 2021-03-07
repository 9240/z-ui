<template>
  <div v-click-outside>
    <input type="text" :value="formatDate" />
    <div v-show="isVisible" class="pannel">
      <div class="pannel-nav">
        <span>&lt;</span>
        <span @click="prevMonth">&lt;&lt;</span>
        <span>{{ time.year }}年</span>
        <span>{{ time.month + 1 }}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span>&gt;</span>
      </div>
      <div class="pannel-content">
        <div class="days">
          <span v-for="j in 7" :key="`_` + j" class="cell">{{
            weekDays[j - 1]
          }}</span>
          <div v-for="i in 6" :key="i">
            <span
              v-for="j in 7"
              :key="j"
              @click="chooseDate(visibleDays[(i - 1) * 7 + (j - 1)])"
              class="cell cell-days"
              :class="[
                {
                  notCurrentMonth: !isCurrentMonth(
                    visibleDays[(i - 1) * 7 + (j - 1)]
                  ),
                },
                {
                  today: isToday(visibleDays[(i - 1) * 7 + (j - 1)]),
                },
                {
                  select: isSelect(visibleDays[(i - 1) * 7 + (j - 1)]),
                },
              ]"
              >{{ visibleDays[(i - 1) * 7 + (j - 1)].getDate() }}</span
            >
          </div>
        </div>
      </div>
      <div class="pannel-footer">今天</div>
    </div>
  </div>
</template>

<script>
import * as utils from "./util.js";
export default {
  directives: {
    clickOutside: {
      bind(el, bindings, vnode) {
        console.log(1);
        const handler = e => {
          if (el.contains(e.target)) {
            if (!vnode.context.isVisible) {
              vnode.context.foucs();
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.blur();
            }
          }
        };
        el.handler = handler;
        document.addEventListener("click", handler);
      },
      unbind(el) {
        document.removeEventListener("click", el.handler);
      },
    },
  },
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    const { year, month } = utils.getYearMonthDay(this.value);
    return {
      weekDays: ["日", "一", "二", "三", "四", "五", "六"],
      time: { year, month },
      isVisible: false, //控制面板是否可见
    };
  },
  computed: {
    visibleDays() {
      //获取当前是周几
      const { year, month } = utils.getYearMonthDay(
        new Date(this.time.year, this.time.month, 1)
      );
      const currentFirstDay = utils.getDate(year, month, 1);
      const week = currentFirstDay.getDay();
      const startDay = currentFirstDay - week * 60 * 60 * 1000 * 24;
      const arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24));
      }
      return arr;
    },
    formatDate() {
      const { year, month, day } = utils.getYearMonthDay(this.value);
      return `${year}-${month + 1}-${day}`;
    },
  },
  methods: {
    foucs() {
      this.isVisible = true;
    },
    blur() {
      this.isVisible = false;
    },
    isCurrentMonth(date) {
      const { year, month } = utils.getYearMonthDay(
        utils.getDate(this.time.year, this.time.month, 1)
      );
      const { year: y, month: m } = utils.getYearMonthDay(date);
      return year === y && month === m;
    },
    isToday(date) {
      const { year, month, day } = utils.getYearMonthDay(new Date());
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    isSelect(date) {
      const { year, month, day } = utils.getYearMonthDay(this.value);
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    chooseDate(date) {
      this.time = utils.getYearMonthDay(date);
      this.$emit("input", date);
      this.blur();
    },
    prevMonth() {
      const d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() - 1);
      this.time = utils.getYearMonthDay(d);
    },
    nextMonth() {
      const d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() + 1);
      this.time = utils.getYearMonthDay(d);
    },
  },
};
</script>

<style scoped>
.pannel {
  width: 224px;
  position: absolute;
  background: #fff;
  box-shadow: 2px 2px 2px pink, -2px -2px 2px pink;
}
.pannel .pannel-nav {
  height: 30px;
  display: flex;
  justify-content: space-around;
}
.pannel .pannel-nav span {
  cursor: pointer;
  user-select: none;
}
.pannel .pannel-content {
  /* width: 32px;
  height: 32px; */
}
.pannel .pannel-content .cell {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
}
.pannel .pannel-content .cell-days:hover,
.select {
  box-sizing: border-box;
  border: 1px solid pink;
}
.pannel .pannel-footer {
  height: 30px;
  text-align: center;
}
.notCurrentMonth {
  color: gray;
}
.today {
  background: red;
  color: #fff;
  border-radius: 4px;
}
.select {
}
</style>
