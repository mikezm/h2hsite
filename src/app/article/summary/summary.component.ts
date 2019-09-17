import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {
  isLoading = false;
  private statusSub: Subscription;

  constructor(public articleService: ArticleService) {}

  ngOnInit() {
    this.statusSub = this.articleService
      .getArticleSummaryStatusListener()
      .subscribe();
  }

  ngOnDestroy() {
    this.statusSub.unsubscribe()
  }
}