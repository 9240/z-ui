import { createApp } from "vue";
import App from "./App.vue";
import Loading from "./lib/Loading/Loading.vue";
import Message from "./lib/Message/Message.vue";
import Button from "./lib/Button/Button.vue";
import Dropdown from "./lib/Dropdown/Dropdown.vue";
import DropdownItem from "./lib/Dropdown/DropdownItem.vue";
import ValidateForm from './lib/Form/ValidateForm.vue'
import ValidateInput from './lib/Form/ValidateInput.vue';
const app = createApp(App);
app.component("Loading", Loading);
app.component("Message", Message);
app.component("Button", Button);
app.component("Dropdown", Dropdown);
app.component("DropdownItem", DropdownItem);
app.component("ValidateForm", ValidateForm);
app.component("ValidateInput", ValidateInput);
app.mount("#app");
