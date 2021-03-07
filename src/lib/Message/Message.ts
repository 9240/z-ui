import Message from "./Message.vue";
import { createApp, App } from "vue";
import { type } from "@/types";
let instance: App;
const createMessage = (
  message: string,
  type: type,
  isShowClose: boolean,
  timeout = 2000
) => {
  instance = createApp(Message, {
    message,
    type,
    isShowClose,
  });
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  instance.mount(mountNode);
  setTimeout(() => {
    instance.unmount(mountNode);
    document.body.removeChild(mountNode);
  }, timeout);
};
export default createMessage;
