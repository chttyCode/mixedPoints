<template>
    <div>
        hello Vue
        <ul>
            <li v-for="t in todos" :key="t.id">
                {{t.name}}
            </li>
        </ul>
    </div>
</template>>
<script lang="ts">
import { Vue,Component } from "vue-property-decorator";

export default class App extends Vue{
    public todos:object[]=[{id:1,name:"苹果"},{id:2,name:"梨"},{id:3,name:"香蕉"}]
}
</script>>
