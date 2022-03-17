<template>
  <p
    class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center"
  >
    Dashboard
  </p>
   <el-table
        align="center"
        header-align="center"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="header in tableHeader"
          :key="header.id"
          :prop="header.prop"
          :label="header.name"
          :width="header.width"
        ></el-table-column>
      </el-table>
</template>
<script setup>


const tableHeader = [
  { id: "1", name: "Privilege Load", prop: "name", width: "300" },
  { id: "2", name: "Balance", prop: "desc", width: "300" },
  { id: "3", name: "Due Date", prop: "type", width: "300" },
];

const tableData = [
  {id:'1',name:'133',desc:'5,600',type:'March 30 2022'}
]
</script>
