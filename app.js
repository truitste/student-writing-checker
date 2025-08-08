// ====== DOM ======
const txt = document.getElementById('studentText');
const runBtn = document.getElementById('runBtn');
const pdfBtn = document.getElementById('pdfBtn');

const aiOut = document.getElementById('aiOutput');
const plagOut = document.getElementById('plagOutput');
const feedbackBox = document.getElementById('feedbackBox');

// ====== Simple AI-pattern detector (no APIs) ======
function aiDetect(text) {
    const lower = text.toLowerCase();
    const patterns = {
        "perfect grammar": "AI-generated text often has overly perfect grammar and structure.",
        "inconsistent facts": "Possible factual errors — common in AI outputs.",
        "no personal voice": "Lack of personal tone can be a sign of AI authorship."
    };

    let findings = [];
    for (const [key, explanation] of Object.entries(patterns)) {
        if (lower.includes(key)) {
            findings.push(`Flagged: "${key}" — ${explanation}`);
        }
    }

    return findings.length ? findings.join("\n") : "No obvious AI patterns detected.";
}

// ====== Simple plagiarism check (Bing search links) ======
function plagiarismCheck(text) {
    const sentences = text.split(/[.?!]/).map(s => s.trim()).filter(Boolean);
    let links = sentences.map(sentence => {
        let q = encodeURIComponent(sentence);
        return `Search: https://www.bing.com/search?q=${q}`;
    });
    return links.join("\n");
}

// ====== Event Listeners ======
runBtn.addEventListener('click', () => {
    const text = txt.value;
    aiOut.textContent = aiDetect(text);
    plagOut.textContent = plagiarismCheck(text);
});

pdfBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("AI Detection Results:\n" + aiOut.textContent, 10, 10);
    doc.text("\nPlagiarism Check:\n" + plagOut.textContent, 10, 40);
    doc.text("\nFeedback:\n" + feedbackBox.value, 10, 70);
    doc.save("feedback.pdf");
});
