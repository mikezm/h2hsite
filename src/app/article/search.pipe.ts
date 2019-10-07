import { Pipe, PipeTransform } from '@angular/core';
import { ArticleSummary } from './article.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: ArticleSummary[], searchText: string): ArticleSummary[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      let matched = false;
      if (it.headline.toLowerCase().includes(searchText)) {
        matched = true;
      }
      if (it.speakers) {
        it.speakers.forEach(s => {
          if (s.name && s.name.toLowerCase().includes(searchText) || s.affiliation && s.affiliation.toLowerCase().includes(searchText)) {
            matched = true;
          }
        });
      }
      if (it.tags) {
        it.tags.forEach(t => {
          if (t.toLowerCase().includes(searchText)) {
            matched = true;
          }
        });
      }
      if (it.info) {
        it.info.forEach(i => {
          if (i.toLowerCase().includes(searchText)) {
            matched = true;
          }
        });
      }
      return matched;
    });
  }
}