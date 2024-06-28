import { Component ,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-rating',
  templateUrl: './start-rating.component.html',
  styleUrls: ['./start-rating.component.css']
})
export class StartRatingComponent implements OnInit {
  @Input() rating: number = 0;
  stars: boolean[] = [];
  ngOnInit(): void {
    this.stars = Array(5).fill(false).map((_, i) => i < this.rating);
  }

  maxRating: number = 5;

  get fullStars(): number {
    return Math.floor(this.rating);
  }

  get hasHalfStar(): boolean {
    return this.rating - this.fullStars >= 0.5;
  }

  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating);
  }

}
