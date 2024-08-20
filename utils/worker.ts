// This is a module worker, so we can use imports (in the browser too!)

addEventListener("message", (event: MessageEvent<number>) => {
  console.log("worker received message:", event.data);
  postMessage("return value");
});
