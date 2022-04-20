<template>
  <el-dialog
    v-model="addSubdivision"
    title="Add Subdivision"
    width="50%"
    :before-close="handleClose"
    center
  >

    <form>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-name"
        >
          Subdivision Name
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-name"
          type="text"
          v-model="form.hoa_subd_name"
          :class="
            errorMsg['hoa_subd_name'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Subdivision Name"
        />
        <span
          v-if="errorMsg['hoa_subd_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-area"
        >
          Area (SQM)
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-area"
          type="text"
          v-model="form.hoa_subd_area"
          :class="
            errorMsg['hoa_subd_area'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Area (SQM)"
        />
        <span
          v-if="errorMsg['hoa_subd_area']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_area"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="total-block-number"
        >
          Total Block Number
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="total-block-number"
          type="text"
          v-model="form.hoa_subd_blocks"
          :class="
            errorMsg['hoa_subd_blocks'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Total Block Number"
        />
        <span
          v-if="errorMsg['hoa_subd_blocks']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_blocks"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="total-lot-number"
        >
          Total Lot Number
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="total-lot-number"
          type="text"
          v-model="form.hoa_subd_lots"
          :class="
            errorMsg['hoa_subd_lots'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Total Lot Number"
        />
        <span
          v-if="errorMsg['hoa_subd_lots']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_lots"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Contact Person
        </label>

        <Combobox
          v-model="emailData"
          :class="
            errorMsg['hoa_subd_contact_person']
              ? 'border-red-300'
              : 'border-gray-300'
          "
        >
          <div class="relative mt-1">
            <div
              class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <ComboboxInput
                class="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                placeholde="Contact Person"
                :displayValue="
                  (person) => (person.hoa_member_lname === undefined && person.hoa_member_fname === undefined  ? '' : person.hoa_member_lname + ' '+ person.hoa_member_fname + ' '+person.hoa_member_mname)
                "
                @change="search = $event.target.value"
              />
              <ComboboxButton
                class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <SelectorIcon
                  class="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </ComboboxButton>
            </div>
            <TransitionRoot
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              @after-leave="search = ''"
            >
              <ComboboxOptions
                class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <div
                  v-if="filteredPeople.length === 0 && search !== ''"
                  class="cursor-default select-none relative py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                  v-for="person in filteredPeople"
                  as="template"
                  :key="person.id"
                  :value="person"
                  v-slot="{ selected, active }"
                >
                  <li
                    class="cursor-default select-none relative py-2 pl-10 pr-4"
                    :class="{
                      'text-white bg-teal-600': active,
                      'text-gray-900': !active,
                    }"
                  >
                    <span
                      class="block truncate"
                      :class="{
                        'font-medium': selected,
                        'font-normal': !selected,
                      }"
                    >
                      {{ person.hoa_member_lname + ' '+ person.hoa_member_fname + ' '+person.hoa_member_mname }}
                    </span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                      :class="{
                        'text-white': active,
                        'text-teal-600': !active,
                      }"
                    >
                      <CheckIcon class="w-5 h-5" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
        <span
          v-if="errorMsg['hoa_subd_contact_person']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_contact_person"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-contact-number"
        >
          Contact Number
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-contact-number"
          type="text"
          v-model="form.hoa_subd_contact_number"
          :class="
            errorMsg['hoa_subd_contact_number']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="Contact Number"
        />
        <span
          v-if="errorMsg['hoa_subd_contact_number']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_contact_number"][0] }}
        </span>
      </div>
    </form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal();">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { ElMessageBox } from "element-plus";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import store from "../../../../../store";

const props = defineProps<{
  addSubdivision: Boolean;
  showEmail:Object;
}>();
const emits = defineEmits(["closeModal"]);

const form = ref({
  hoa_subd_name: "",
  hoa_subd_area: "",
  hoa_subd_blocks: "",
  hoa_subd_lots: "",
  hoa_subd_contact_person: "",
  hoa_subd_contact_number: "",
});

let emailData = ref({})
const search = ref("");
const errorMsg = ref("");




const filteredPeople = computed(() =>
  props.showEmail.filter(
    (data) =>
      !search.value ||
      data.hoa_member_lname.toLowerCase().includes(search.value.toLowerCase()) ||
      data.hoa_member_fname.toLowerCase().includes(search.value.toLowerCase()) ||
      data.hoa_member_mname.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};

function closeModal() {
  (emailData.value = []),
    (form.value.hoa_subd_name = ""),
    (form.value.hoa_subd_area = ""),
    (form.value.hoa_subd_blocks= ""),
    (form.value.hoa_subd_lots = ""),
    (form.value.hoa_subd_contact_person = ""),
    (form.value.hoa_subd_contact_number = ""),
    (errorMsg.value = "");
  emits("closeModal");
}

async function handleSubmit() {
  form.value.hoa_subd_contact_person = emailData.value.hoa_member_lname+' '+emailData.value.hoa_member_fname+" "+emailData.value.hoa_member_mname
  const res = await store.dispatch("subdivision/addSubdivision", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("subdivision/getSubdivisions");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The subdivision data was successfully created",
      });
      closeModal();
    } else {
      errorMsg.value = res.response.data.errors;
    }
  } catch (err) {
    await store.commit("alert/notify", {
      title: "Error",
      type: "danger",
      message: err,
    });
  }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color-base);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
