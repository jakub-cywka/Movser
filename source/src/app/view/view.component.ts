import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.less']
})
export class ViewComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location) { }

  public title: string;

  public result: any;

  public trailer: any;

  public onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.title !== '') {
      this.router.navigate(['view'], {
        queryParams: {
          title: this.title
        }
      }).then(() => {
        this.getVideo();
      });
    }
  }

  public goBack(): void {
    this.location.back();
  }

  public getVideo(): void {
    this.movieService.getVideo(this.title).subscribe((data: any) => {
      this.result = data;
      console.log(this.result);
    });
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((data: ParamMap) => this.title = data.get('title'));
    this.getVideo();
  }

}
