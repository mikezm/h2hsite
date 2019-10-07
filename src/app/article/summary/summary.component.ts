import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArticleService } from '../article.service';
import { ArticleSummary } from '../article.model';
import { AuthService } from '../../auth/auth.service';
@Component({
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class ArticleSummaryComponent implements OnInit, OnDestroy {
  articles: ArticleSummary[] = [];
  isLoading = false;
  private articleSub: Subscription;

  totalArticles = 0;
  artcilesPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15];

  userIsAuthenticated = false;
  userId: string;
  userRole: string;
  private authStatusSub: Subscription;

  constructor(
    public articleService: ArticleService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.articleService.getArticleSummary(this.artcilesPerPage, this.currentPage);

    this.articleSub = this.articleService
      .getArticleSummaryUpdateListener()
      .subscribe(fetchedArticles => {
        this.isLoading = false;
        this.articles = fetchedArticles;
      });
  }

  displayArticles() {
    return (this.articles.length>0 && !this.isLoading)
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe()
  }
}