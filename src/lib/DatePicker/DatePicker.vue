<template>
  <div ref="datePickerRef">
    <input type="text" :value="formatDate" @click="toggleOpen" />
    <div v-show="isVisible" class="pannel">
      <div class="pannel-nav">
        <span @click="prevMonth">&lt;</span>
        <span>{{ time.year }}年</span>
        <span>{{ time.month + 1 }}月</span>
        <span @click="nextMonth">&gt;</span>
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
                  )
                },
                {
                  today: isToday(visibleDays[(i - 1) * 7 + (j - 1)])
                },
                {
                  select: isSelect(visibleDays[(i - 1) * 7 + (j - 1)])
                }
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

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import * as utils from "./util";
import useClickOutside from "@/util/useClickOutside";
export default defineComponent({
  name: "datepicker",
  props: {
    modelValue: {
      type: Date,
      default: () => new Date()
    }
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const { year, month } = utils.getYearMonthDay(new Date(props.modelValue));
    const time = ref({
      year,
      month
    });
    const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
    const formatDate = computed(() => {
      const { year, month, day } = utils.getYearMonthDay(
        new Date(props.modelValue)
      );
      return `${year}-${month + 1}-${day}`;
    });
    const visibleDays = computed(() => {
      const { year, month } = utils.getYearMonthDay(
        new Date(time.value.year, time.value.month, 1)
      );
      const currentFirstDay = utils.getDate(year, month, 1);
      const week = currentFirstDay.getDay();
      const startDay = currentFirstDay.getTime() - week * 60 * 60 * 1000 * 24;
      const arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24));
      }
      return arr;
    });
    const isVisible = ref<boolean>(false);
    const datePickerRef = ref<null | HTMLElement>(null);
    const toggleOpen = () => {
      isVisible.value = !isVisible.value;
    };
    const isClickOutSide = useClickOutside(datePickerRef);
    watch(isClickOutSide, () => {
      if (isVisible.value && isClickOutSide.value) {
        isVisible.value = false;
      }
    });
    const isCurrentMonth = (date: Date) => {
      const { year, month } = utils.getYearMonthDay(
        utils.getDate(time.value.year, time.value.month, 1)
      );
      const { year: y, month: m } = utils.getYearMonthDay(date);
      return year === y && month === m;
    };
    const isToday = (date: Date) => {
      const { year, month, day } = utils.getYearMonthDay(new Date());
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    };
    const isSelect = (date: Date) => {
      const { year, month, day } = utils.getYearMonthDay(
        new Date(props.modelValue)
      );
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    };
    const chooseDate = (date: Date) => {
      time.value = utils.getYearMonthDay(date);
      context.emit("update:modelValue", date);
    };
    const prevMonth = () => {
      const d = utils.getDate(time.value.year, time.value.month, 1);
      d.setMonth(d.getMonth() - 1);
      time.value = utils.getYearMonthDay(d);
    };
    const nextMonth = () => {
      const d = utils.getDate(time.value.year, time.value.month, 1);
      d.setMonth(d.getMonth() + 1);
      time.value = utils.getYearMonthDay(d);
    };
    return {
      formatDate,
      isVisible,
      weekDays,
      datePickerRef,
      toggleOpen,
      time,
      visibleDays,
      isCurrentMonth,
      isToday,
      isSelect,
      chooseDate,
      prevMonth,
      nextMonth
    };
  }
});
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
