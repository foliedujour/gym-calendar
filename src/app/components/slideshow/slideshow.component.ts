import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Slide {
  src: string;
  captionTitle: string;
  captionHeading: string;
  captionText: string;
  buttonText: string;
}

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent {
  slides: Slide[] = [
    {
      src: 'assets/image1.jpg',
      captionTitle: 'NEW WELLNET COMPETITION',
      captionHeading: 'BEST OF SANTORINI, ALL IN ONE SPOT!',
      captionText: 'Πάρτε μέρος στο νέο Wellnet διαγωνισμό μας με μεγάλο δώρο 3 μοναδικά ταξίδια στα Luxury Hotels \'CANAVES COLLECTION\', στη Σαντορίνη.',
      buttonText: 'BOOK NOW!'
    },
    {
      src: 'assets/image2.jpg',
      captionTitle: 'NEW WELLNET COMPETITION',
      captionHeading: 'BEST OF SANTORINI, ALL IN ONE SPOT!',
      captionText: 'Πάρτε μέρος στο νέο Wellnet διαγωνισμό μας με μεγάλο δώρο 3 μοναδικά ταξίδια στα Luxury Hotels \'CANAVES COLLECTION\', στη Σαντορίνη.',
      buttonText: 'BOOK NOW!'
    },
    {
      src: 'assets/image3.jpg',
      captionTitle: 'NEW WELLNET COMPETITION',
      captionHeading: 'BEST OF SANTORINI, ALL IN ONE SPOT!',
      captionText: 'Πάρτε μέρος στο νέο Wellnet διαγωνισμό μας με μεγάλο δώρο 3 μοναδικά ταξίδια στα Luxury Hotels \'CANAVES COLLECTION\', στη Σαντορίνη.',
      buttonText: 'BOOK NOW!'
    },
    {
      src: 'assets/image6.jpg',
      captionTitle: 'NEW WELLNET COMPETITION',
      captionHeading: 'BEST OF SANTORINI, ALL IN ONE SPOT!',
      captionText: 'Πάρτε μέρος στο νέο Wellnet διαγωνισμό μας με μεγάλο δώρο 3 μοναδικά ταξίδια στα Luxury Hotels \'CANAVES COLLECTION\', στη Σαντορίνη.',
      buttonText: 'BOOK NOW!'
    }
  ];

  currentSlideIndex: number = 0;
  
  constructor(
    private router: Router
  ) {}

  
  prevSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex > 0) ? this.currentSlideIndex - 1 : this.slides.length - 1;
  }

  nextSlide(): void {
    console.log(this.currentSlideIndex);
    this.currentSlideIndex = (this.currentSlideIndex < this.slides.length - 1) ? this.currentSlideIndex + 1 : 0;
  }

  navigateToLogin(): void {
    this.router.navigate(['login']).then(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
}

}

