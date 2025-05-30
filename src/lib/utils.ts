export async function* streamFetch(
    input: string | URL | RequestInfo,
    init?: RequestInit
) {
    const res = await fetch(input, init);
    if (!res.body) return;
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        try {
            yield decoder.decode(value);
        } catch (error: any) {
            console.warn(error.message);
        }
    }
}
