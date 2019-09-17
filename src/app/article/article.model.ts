
interface Speaker {
    speaker_name: string;
    affiliation: string;
}

interface Paragraph {
    text: string;
    speaker: string;
    question: boolean;
    comment: boolean;
}

interface Article {
    title: string;
    date: string;
    speakers: Speaker;
    tags: string[];
    info: string[];
    paragraphs: Paragraph[];
}

interface ArticleSummary {
    title: string;
    date: string;
    speakers: Speaker;
    tags: string[];
    info: string[];
}

interface ArticleSummaryResponse {
    data: ArticleSummary[];
}

export {
    Article,
    ArticleSummary,
    ArticleSummaryResponse
}