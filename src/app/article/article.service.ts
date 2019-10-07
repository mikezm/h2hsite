import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, ArticleSummary, ArticleResponse, ArticleSummaryReponse } from './article.model'
import { environment } from '../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}/articles`;

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private article: Article;
  private articleSummary: ArticleSummary[];
  private articleUpdated = new Subject<Article>();
  private articleSummaryUpdated = new Subject<ArticleSummary[]>();

  constructor(private http: HttpClient) { }

  private transformArticleResponse(rawData: ArticleResponse): Article {
    return {
      headline: rawData.headline,
      speakers: (rawData.speakers) ? rawData.speakers.map(s => {
        return {
          name: s.speaker_name,
          affiliation: s.affiliation
        }
      }): null,
      date: rawData.article_date,
      info: rawData.info,
      tags: rawData.tags,
      paragraphs: rawData.paragraphs
    };
  }

  private transformArticleSummaryResponse(res: { data: ArticleSummaryReponse[] }): ArticleSummary[] {
    const results = res.data;
    return results.map(rawData => {
      return {
        headline: rawData.headline,
        speakers: (rawData.speakers) ? rawData.speakers.map(s => {
          return {
            name: s.speaker_name,
            affiliation: s.affiliation
          }
        }): null,
        date: rawData.article_date,
        info: rawData.info,
        tags: rawData.tags
      };
    })
    .sort((a,b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    });
  }

  getArticleUpdateListener() {
    return this.articleUpdated.asObservable();
  }

  getArticleSummaryUpdateListener() {
    return this.articleSummaryUpdated.asObservable();
  }

  getArticleSummary(perPage: number, currentPage: number) {
    //const queryParams = `?pagesize=${perPage}&page=${currentPage}`;
    return this.http
      .get<{ data: ArticleSummaryReponse[] }>(`${BACKEND_URL}/summary`)
      .pipe(map(this.transformArticleSummaryResponse))
      .subscribe(transformedSummary => {
        this.articleSummary = transformedSummary;
        this.articleSummaryUpdated.next(this.articleSummary);
      });
  }

  getArticle(headline: string) {
    const body = { headline: headline }
    this.http
      .post<ArticleResponse>(`${BACKEND_URL}/article`, body)
      .pipe(map(this.transformArticleResponse))
      .subscribe(transformedArticle => {
        this.article = transformedArticle;
        this.articleUpdated.next(this.article);
      });
  }
}

