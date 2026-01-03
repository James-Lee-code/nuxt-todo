<script setup lang="ts">
import useAuth from "../composables/useAuth";

const isFormOpen = ref(false);

const authState = ref<"登入" | "註冊">("登入");
const authError = ref("");
const showConfirmEmailMessage = ref(false);

const input = reactive({
  email: "",
  password: "",
});

const { signIn, signUp, setGuest } = useAuth();
const router = useRouter();

const openForm = () => {
  isFormOpen.value = true;
};

const toggleAuthState = () => {
  authState.value = authState.value === "登入" ? "註冊" : "登入";
  authError.value = "";
};

const handleSubmit = async () => {
  try {
    if (authState.value === "登入") {
      await signIn(input);
      router.push("/");
    } else {
      await signUp(input);
      showConfirmEmailMessage.value = true;
    }
  } catch (err) {
    authError.value = (err as Error).message;
  }
};

const continueAsGuest = () => {
  setGuest();
  router.push("/");
};
</script>

<template>
  <div class="container" :class="{ change: isFormOpen }">
    綠色背景
    <div class="green-bg">
      <div class="banner">
        <h1>歡迎</h1>
        <p>開始使用 Todo App</p>
        <UButton class="mt-6" variant="outline" @click="openForm">
          登入 / 註冊
        </UButton>
        <UButton class="mt-3" variant="ghost" @click="continueAsGuest">
          不登入直接使用
        </UButton>
      </div>
    </div>
    <div class="auth-form">
      <UCard>
        <h3 class="mb-4">{{ authState }}</h3>

        <input v-model="input.email" placeholder="Email" />

        <input
          v-model="input.password"
          type="password"
          placeholder="密碼"
        />

        <p v-if="authError" class="error">{{ authError }}</p>

        <div class="actions">
          <UButton @click="handleSubmit">確認</UButton>
          <span @click="toggleAuthState">
            {{ authState === "登入" ? "註冊帳戶？" : "登入帳戶？" }}
          </span>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style scoped>
/* 整體畫面背景 */

/* 主容器（縮小 + 置中） */
.container {
  position: relative;
  width: 900px;
  height: 520px;
  margin: auto;
  top: 50%;
  transform: translateY(-10%);
  border-radius: 1.5rem;
  overflow: hidden;
  /* box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25); */
}

/* 綠色背景（滑動） */
.green-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  background: linear-gradient(to right, #3ab19b, #4cbf91);
  transition: width 1.2s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 1;
}

.container.change .green-bg {
  width: 30%;
}

/* 左側文字區 */
.banner {
  color: white;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 80%;
  z-index: 2;
}

.banner h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.banner p {
  font-size: 1rem;
  opacity: 0.9;
}

/* 表單區（一開始在右側外面） */
.auth-form {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  padding: 3rem;
  background-color:#eee; /* 灰白背景 */
  display: flex;
  align-items: center;
  transition: left 1.2s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 3;
}

.container.change .auth-form {
  left: 30%;
}

/* 表單卡片本體（Nuxt UI UCard） */
.auth-form :deep(.u-card) {
  height: 100%;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
}

/* input 樣式 */
input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid #d1d5db;
  outline: none;
  font-size: 0.9rem;
}

/* 底部操作區 */
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.actions span {
  cursor: pointer;
  font-size: 0.8rem;
  color: #2563eb;
}

/* 錯誤訊息 */
.error {
  color: #dc2626;
  font-size: 0.8rem;
  margin-top: 0.4rem;
}

</style>
