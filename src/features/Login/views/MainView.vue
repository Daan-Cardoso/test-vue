<template>
  <div
    class="
      @container
      md:p-10
      flex
      items-center
      justify-center
      h-screen
    "
  >
    <form
      @submit.prevent="onSubmit"
      class="
        bg-gray-200
        flex
        flex-col
        gap-4
        h-full
        justify-center
        md:justify-start
        md:rounded-lg
        md:w-[30%]
        md:h-auto
        min-w-[300px]
        p-4
        shadow-sm 
        w-full
        "
      >

      <h1 class="text-center text-xl font-bold uppercase">
        <span class="text-indigo-400"><</span>
        Todo App
        <span class="text-indigo-400">/></span>
      </h1>

      <Form.Input
        label="usuário"
        name="user"
        placeholder="Digite o e-mail"
        required
        type="text"
        v-model="formData.user.value"
      />

      <Form.Input
        custom-class="w-full"
        label="senha"
        name="password"
        placeholder="Digite a senha"
        required
        type="password"
        v-model="formData.password.value"
      />

      <div class="w-full flex justify-end">
        <Form.Button
          text="Entrar"
          custom-class="w-[30%]"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Form from '@/shared/components/Form';
import { reactive } from 'vue';
import base64 from 'base-64';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = reactive({
  user: {
    value: '',
    errorMessage: ''
  },
  password: {
    value: '',
    errorMessage: ''
  }
})

const { data: token, setItem: setToken } = useLocalStorage('access_token', '');

interface Field {
  name: string;
  value: string;
  required: boolean;
  errorMessage?: string;
}

const validateFields = (fields: Field[]) => {
  fields.forEach((field: Field) => {
    if (field.required && !field.value) {
      field.errorMessage = 'Campo obrigatório';
    }

    if (formData.user.value !== 'admin' || formData.password.value !== 'admin') {
      formData.user.errorMessage = 'Usuário ou senha inválidos';
    }
  });

  const hasError = fields.some((field: Field) => field.errorMessage);

  return !hasError;
}

const fakeLogin = () => {
  if (formData.user.value === 'admin' && formData.password.value === 'admin') {
    setToken(base64.encode('admin:admin'));

    router.push({ name: 'Todo' });
  }
}

const onSubmit = (e: any) => {
  const form = e.target as HTMLFormElement;
  const inputs = Array.from(form.elements) as HTMLInputElement[];

  const fieldsToValidate = inputs
      .filter((field) => field.type === "text" || field.type === "password")
      .map((field) => ({
        name: field.name,
        value: field.value,
        required: field.required
      }))

  if (!validateFields(fieldsToValidate)) return;

  fakeLogin();
};

</script>

<style scoped>

</style>