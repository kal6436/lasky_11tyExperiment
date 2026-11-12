export default async function (island) {
  const gallery = island.querySelector("#gallery");
  if (!gallery) {
    throw new Error("Gallery island is missing #gallery");
  }

  const { createApp } = await import("./petite-vue.js");
  createApp().mount(gallery);
}
