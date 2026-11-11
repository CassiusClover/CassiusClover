/** Serial native work; obsolete queued requests are skipped and obsolete replies discarded. */
export function createLatestQueue<Input, Output>(work: (input: Input) => Promise<Output | null>) {
  let revision = 0;
  let tail: Promise<void> = Promise.resolve();
  const request = (input: Input): Promise<Output | null> => {
    const ticket = ++revision;
    const task = tail.then(async () => {
      if (ticket !== revision) return null;
      try {
        const result = await work(input);
        return ticket === revision ? result : null;
      } catch { return null; }
    });
    tail = task.then(() => {});
    return task;
  };
  return { request, cancel: () => { revision += 1; } };
}
