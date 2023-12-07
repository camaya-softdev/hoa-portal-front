<template>
  <!-- <section class="md:h-full flex items-center text-gray-600"> -->

  <div class="mx-auto mt-5 main-div text-center">
    <div class="grid grid-cols-2 gap-4 content-center">
      <div class="text-center">
        <h1 class="text-xl title_inquire mt-5">Follow us on social Media</h1>
        <p class="social_content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptates
          magni adipisci delectus iste est? Debitis cumque quas veritatis suscipit ex
          quibusdam, sapiente consequuntur at autem accusantium numquam eum facilis.
        </p>

        <div class="flex flex-row justify-center">
          <button
            class="mr-3 mt-3 group items-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#312C30] text-white hover:bg-black hover:text-yellow-700 active:bg-white active:text-yellow-900 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105 shadow-xl shadow-slate-900/10"
          >
            <img src="/logo/fb.png" class="h-10 w-100" />
          </button>

          <button
            class="mt-3 mr-3 group rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#312C30] text-white hover:bg-black hover:text-yellow-700 active:bg-white active:text-yellow-900 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105 shadow-xl shadow-slate-900/10"
          >
            <img src="/logo/insta.png" class="h-10 w-100" />
          </button>
          <button
            class="mt-3 group mr-3 items-center justify-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#312C30] text-white hover:bg-black hover:text-yellow-700 active:bg-black active:text-yellow-900 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105 shadow-xl shadow-slate-900/10"
          >
            <img src="/logo/yt.png" class="h-10 w-100" />
          </button>
          <button
            class="mt-3 group inline-flex items-center justify-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#312C30] text-white hover:bg-black hover:text-yellow-700 active:bg-white active:text-yellow-900 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105 shadow-xl shadow-slate-900/10"
          >
            <img src="/logo/twitter.png" class="h-10 w-100" />
          </button>
        </div>
      </div>
      <div>
        <h1 class="text-xl title_inquire mt-5">Inquire Now</h1>
        <form class="rounded ml-20 mr-20 mt-5">
          <div class="flex flex-col mb-4">
            <input
              class="rounded-full border-none rounded-full py-2 px-3 text-gray-900 placeholder:text-gray-400 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="fullname"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div class="grid grid-cols-2">
            <div class="flex flex-col mb-4">
              <input
                class="rounded-full border-none rounded-full py-2 px-3 text-gray-900 placeholder:text-gray-400 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="contact_number"
                type="text"
                placeholder="Contact Number"
              />
            </div>
            <div class="flex flex-col mb-4 ml-3">
              <input
                class="rounded-full border-none rounded-full py-2 px-3 text-gray-900 placeholder:text-gray-400 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="contact_number"
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <textarea
              cols="3"
              rows="3"
              class="border-none rounded-lg py-2 px-3 text-gray-900 placeholder:text-gray-400 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="message"
              placeholder="Message"
            ></textarea>
          </div>

          <button
            type="submit"
            class="mt-3 group inline-flex items-center justify-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#613A24] text-white hover:bg-white hover:text-yellow-700 active:bg-white active:text-yellow-900 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105 shadow-xl shadow-slate-900/10"
          >
            <span class="mr-2">Submit</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.main-div {
  background-color: #f5f5f5;
  width: 100%;
  height: 400px;
}

.social_content {
  color: #333;
  margin-left: 5rem;
  margin-top: 1.25rem;
}
.title_inquire {
  width: 100%;
  text-decoration: underline;
  text-decoration-color: #754924;
  text-decoration-thickness: 3px;
  /* color: #ca8a04; */
  color: #333;
}
</style>
