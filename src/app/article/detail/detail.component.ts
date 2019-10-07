import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { AuthService } from '../../auth/auth.service';
@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  private requestedHeadline: string = '';
  article: Article;
  isLoading = false;
  private articleSub: Subscription;

  userIsAuthenticated = false;
  userId: string;
  userRole: string;
  private authStatusSub: Subscription;

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('headline')) {
        this.requestedHeadline = paramMap.get('headline');
        this.isLoading = true;
        this.articleService.getArticle(this.requestedHeadline);
      }
    });
    this.articleSub = this.articleService
      .getArticleUpdateListener()
      .subscribe( (fetchedArticle: Article) => {
        this.isLoading = false;
        this.article = fetchedArticle;
      });
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}