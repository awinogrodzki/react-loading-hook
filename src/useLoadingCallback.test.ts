import { renderHook, act } from "@testing-library/react-hooks";
import { useLoadingCallback } from "./useLoadingCallback";

describe("useLoadingCallback", () => {
  it("should set loading state if callback is called but not resolved", async () => {
    const callback = () => Promise.resolve("foo");
    const { result, waitForNextUpdate } = renderHook(() =>
      useLoadingCallback(callback)
    );

    const [handleCallback] = result.current;

    act(() => {
      handleCallback();
    });

    expect(result.current[1]).toBe(true);

    await waitForNextUpdate();

    expect(result.current[1]).toBe(false);
  });

  it("should return value that provided callback returns", async () => {
    const callback = () => Promise.resolve("foo");
    const { result } = renderHook(() => useLoadingCallback(callback));

    const [handleCallback] = result.current;

    await act(async () => {
      const value = await handleCallback();

      expect(value).toBe("foo");
    });
  });

  it("should set error state thrown by callback, loading state to false and then throw the error", async () => {
    const callback = () => Promise.reject("bar");
    const { result } = renderHook(() => useLoadingCallback(callback));

    const [handleCallback] = result.current;

    await act(async () => {
      try {
        await handleCallback();
      } catch (e) {
        expect(e).toBe("bar");
      }
    });

    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBe("bar");
  });

  it("should reset loading state to false and error to undefined", async () => {
    const callback = () => Promise.reject("bar");
    const { result } = renderHook(() => useLoadingCallback(callback));

    const [handleCallback] = result.current;

    await act(async () => {
      try {
        await handleCallback();
      } catch (e) {}
    });

    act(() => {
      result.current[3]();
    });

    expect(result.current[2]).toBe(undefined);
  });
});
