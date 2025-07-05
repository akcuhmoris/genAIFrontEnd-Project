import { useAuthStore } from "../store/authStore";

export function StoreTest() {
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);
  const clearToken = useAuthStore((state) => state.clearToken);

  return (
    <div className="space-x-2">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={() => setToken("test-token-123")}
      >
        Set Token
      </button>
      <button
        className="px-3 py-1 bg-gray-500 text-white rounded"
        onClick={clearToken}
      >
        Clear Token
      </button>
      <span className="ml-4">Current Token: {token}</span>
    </div>
  );
}
