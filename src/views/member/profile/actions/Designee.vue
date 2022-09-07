<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Designee
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Note: if single parents are qualified designees. if married, spouse and children are qualified
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">

        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <Table class="mt-3">
              <template v-slot:table>
                <thead class="border-gray-50 border-b-2">
                <tr>
                  <th class="p-3 text-sm font-semibold tracking-wide text-center">
                    Name of Designee
                  </th>

                  <th class="p-3 text-sm font-semibold tracking-wide text-center">
                    Relationship
                  </th>
                  <th class="p-3 text-sm font-semibold tracking-wide text-center">
                    Birthday
                  </th>
                  <th class="p-3 text-sm font-semibold tracking-wide text-center">
                    Action
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                <tr class="bg-gray-50" v-for="data in designeeData">
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    {{data.hoa_member_designee_name}}
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    {{data.hoa_member_designee_relation}}
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    {{data.hoa_member_bday}}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    <a
                      @click="deleteDesignee(data.id)"
                      class="font-bold text-red-500 hover:underline cursor-pointer text-center"
                    >Delete
                    </a>
                  </td>
                </tr>
                </tbody>
              </template>
            </Table>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              @click="addDesignee = true"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        </div>
        <add-designee
          :add-designee="addDesignee"
          @close-modal="addDesignee = false"
        ></add-designee>
      </div>
    </div>
  </div>
</template>
<script setup>
  import Table from "../../../../components/Table.vue";
  import AddDesignee from "./designeeAction/AddDesignee.vue"
  import store from "../../../../store";
  import {ref, watch, computed} from "vue"

  let addDesignee = ref(false);
  let designeeData = ref({});

  store.dispatch('designee/getDesignees');
  watch(() => store.state.designee.designee.data,
    (newVal, oldVal) => {
      let valDAta = computed(() => newVal)
      designeeData.value = valDAta.value
      console.log(designeeData.value)
    })

  async function deleteDesignee(id) {
    if (
      confirm(
        `Are you sure you want to delete this data? Operation can't be undone`
      )
    ) {
      try {
        const res = await store.dispatch("designee/deleteDesignee", id);
        if (res.status === 204) {
          await store.dispatch("designee/getDesignees");
          await store.commit("alert/notify", {
            title: "Success",
            type: "success",
            message: "The designee data was successfully deleted",
          });
        }
      } catch (err) {
        throw err;
      }
    }
  }
</script>
<style>

</style>
