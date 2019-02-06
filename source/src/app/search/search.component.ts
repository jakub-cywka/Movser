import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from './movie';
import { Data } from './data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent implements OnInit {

  constructor(private movieService: MovieService, private router: Router) { }

  public title: string;

  public movies: Movie[];

  public datas: Data[];

  public randomMovie: any;

  public randomIndex: number;

  public onKeydown(event: KeyboardEvent): void {
    if (this.title !== '' && event.key === 'Enter') {
      this.navigate();
    }
  }

  public navigate(): void {
    if (this.title !== '') {
      this.router.navigate(['view'], {
        queryParams: {
          title: this.title
        }
      });
    }
    if (this.title === 'Populars' || this.title === 'populars') {
      this.router.navigate(['populars']);
    }
  }

  public navigateByClick(movie: Movie): void {
    this.title = movie.title;
    this.navigate();
  }

  public navigateByMovie(movie: any): void {
    this.title = movie.data.Title;
    this.navigate();
  }

  public generateNumberArray(length: number): number[] {
    const array: number[] = [];
    for (let i = 0; i < length; i++) {
      array.push(i);
    }
    return array;
  }

  public ngOnInit(): void {
    this.movies = [
      {
        title: 'Interstellar'
      },
      {
        title: 'Planet Earth'
      },
      {
        title: 'Blue planet'
      },
      {
        title: 'Planet Earth II'
      },
      {
        title: 'The Last Samurai'
      },
      {
        title: 'Blue Planet II'
      }
    ];
    this.datas = [];
    this.randomIndex = Math.floor(Math.random() * this.movies.length);
    this.movieService.getVideo(this.movies[this.randomIndex].title).toPromise().then((response: any) => {
      this.randomMovie = response;
      console.log(this.randomMovie);
      this.title = this.randomMovie.Title;
    }).then(() => {
      for (const movie of this.movies) {
        let result: any;
        this.movieService.getVideo(movie.title).toPromise().then((response: any) => {
          result = response;
        }).then(() => {
          this.datas.push({
            data: result
          });
        });
      }
    });
  }
}
