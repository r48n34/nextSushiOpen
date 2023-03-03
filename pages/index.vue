<script setup>
import { NButton, darkTheme, NConfigProvider } from 'naive-ui'


const { data: data } = await useFetch('/api/test?id=11&method=QueueAndWaitTime');

watchEffect(() => console.log(data.value))
const storeData = computed(() => data.value.data || null)


</script>

<template>

    <n-config-provider :theme="darkTheme">
    <div>
        <h1>Welcome to the homepage</h1>
        <n-button type="primary">naive-ui</n-button>
        <br>
        <AppAlert>
            This is an auto-imported component
            <!-- {{ storeData || "N/A"}} -->
        </AppAlert>
    </div>
    </n-config-provider>

</template>