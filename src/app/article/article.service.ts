import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { Article, ArticleSummary, ArticleSummaryResponse } from './article.model'
import { environment } from '../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}/articles`;

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private articleStatusListener = new Subject<boolean>();
  private articleSummaryStatusListener = new Subject<boolean>();
  private article: Article;
  private articleSummary: ArticleSummary[];

  constructor(private http: HttpClient, private router: Router) { }

  getArticleStatusListener() {
    return this.articleStatusListener.asObservable();
  }

  getArticleSummaryStatusListener() {
    return this.articleSummaryStatusListener.asObservable();
  }

  getArticleSummaryResults() {
    return this.articleSummary;
  }

  getArticleResults() {
    return this.article;
  }

  getArticleSummary() {
    return this.http
      .get<ArticleSummaryResponse>(`${BACKEND_URL}/summary`)
      .subscribe(response => {
        this.articleSummary = response.data;
        this.articleSummaryStatusListener.next(true);
      }, error => {
        this.articleSummaryStatusListener.next(false);
      });
  }

  getArticle(headline: string) {
    const body = { headline: headline }
    this.http
      .post<Article>(`${BACKEND_URL}/article`, body)
      .subscribe(response => {
        this.article = response;
        this.articleStatusListener.next(true);
      }, error => {
        this.articleStatusListener.next(false);
      });
  }
}

