<template>
  <h1>Bienvenido</h1>
  <p>{{ formattedDate }}</p>
</template>

<script setup>
import dayjs from "dayjs";

const currentDate = dayjs();
const formattedDate = dayjs(currentDate).format('DD-MM-YYYY');
</script>
