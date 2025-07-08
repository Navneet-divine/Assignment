export async function POST(req: Request) {
    const { text } = await req.json();

    // Fake AI summary (for demo or development)
    const summary = `🧠 AI Summary: ${text.slice(0, 30)}...`;

    return Response.json({ summary });
}
