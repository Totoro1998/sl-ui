<script>
import { showToast } from 'vant';
import { useLocale } from './locales';

export default {
  setup() {
    const { locale, changeLocale } = useLocale();
    const columns = [
      { text: '杭州', value: 'Hangzhou' },
      { text: '宁波', value: 'Ningbo' },
      { text: '温州', value: 'Wenzhou' },
      { text: '绍兴', value: 'Shaoxing' },
      { text: '湖州', value: 'Huzhou' },
    ];
    const onConfirm = ({ selectedValues }) => {
      showToast(`当前值: ${selectedValues.join(',')}`);
    };
    const onChange = ({ selectedValues }) => {
      showToast(`当前值: ${selectedValues.join(',')}`);
    };
    const onCancel = () => showToast('取消');
    const handleClick = async () => {
      await changeLocale(locale.value === "en-US" ? "zh-CN" : "en-US");
      // location.reload();
    }
    return {
      columns,
      onChange,
      onCancel,
      onConfirm,
      locale,
      handleClick
    };
  },
};

</script>

<template>
  <RouterView />
</template>