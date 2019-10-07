
interface Speaker {
    name: string;
    affiliation: string;
}

interface SpeakerResponse {
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
    headline: string;
    date: Date;
    speakers: Speaker[];
    tags: string[];
    info: string[];
    paragraphs: Paragraph[];
}

interface ArticleSummary {
    headline: string;
    date: Date;
    speakers: Speaker[];
    tags: string[];
    info: string[];
}

interface ArticleResponse {
    headline: string;
    article_date: Date;
    speakers: SpeakerResponse[];
    tags: string[];
    info: string[];
    paragraphs: Paragraph[];
}

interface ArticleSummaryReponse {
    headline: string;
    article_date: Date;
    speakers: SpeakerResponse[];
    tags: string[];
    info: string[];
}

export { Article, ArticleSummary, ArticleResponse, ArticleSummaryReponse }