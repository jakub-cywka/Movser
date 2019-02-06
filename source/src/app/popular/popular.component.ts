import { Component, OnInit } from '@angular/core';
import { Movie } from '../search/movie';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Data } from '../search/data';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.less']
})
export class PopularComponent implements OnInit {

  constructor(private router: Router, private movieService: MovieService) { }

  public movies: Movie[];

  public title: string;

  public datas: Data[];

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
    if (this.title === 'Popular') {
      this.router.navigate(['popular']);
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

  public ngOnInit() {
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
    this.movies.forEach((movie: Movie) => {
      this.movieService.getVideo(movie.title).subscribe((response: any) => {
        this.datas.push({
          data: response
        });
      });
    });
  }

}
