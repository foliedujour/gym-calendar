import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule,],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  slides: Slide[] = [
    {
      src: 'assets/image1.jpg',
      captionTitle: 'NEW WELLNET COMPETITION',
      captionHeading: 'BEST OF SANTORINI, ALL IN ONE SPOT!',
      captionText: 'Πάρτε μέρος στο νέο Wellnet διαγωνισμό μας με μεγάλο δώρο 3 μοναδικά ταξίδια στα Luxury Hotels \'CANAVES COLLECTION\', στη Σαντορίνη.',
      buttonText: 'ΕΓΓΡΑΦΕΙΤΕ ΤΩΡΑ ΣΤΑ ΜΑΘΗΜΑΤΑ ΜΑΣ'
    },
    {
      src: 'assets/image2.jpg',
      captionTitle: 'NEW WELLNET COMPETITION',
      captionHeading: 'BEST OF SANTORINI, ALL IN ONE SPOT!',
      captionText: 'Πάρτε μέρος στο νέο Wellnet διαγωνισμό μας με μεγάλο δώρο 3 μοναδικά ταξίδια στα Luxury Hotels \'CANAVES COLLECTION\', στη Σαντορίνη.',
      buttonText: 'ΕΓΓΡΑΦΕΙΤΕ ΤΩΡΑ ΣΤΑ ΜΑΘΗΜΑΤΑ ΜΑΣ'
    },
    {
      src: 'assets/image3.jpg',
      captionTitle: 'NEW WELLNET COMPETITION',
      captionHeading: 'BEST OF SANTORINI, ALL IN ONE SPOT!',
      captionText: 'Πάρτε μέρος στο νέο Wellnet διαγωνισμό μας με μεγάλο δώρο 3 μοναδικά ταξίδια στα Luxury Hotels \'CANAVES COLLECTION\', στη Σαντορίνη.',
      buttonText: 'ΕΓΓΡΑΦΕΙΤΕ ΤΩΡΑ ΣΤΑ ΜΑΘΗΜΑΤΑ ΜΑΣ'
    }
  ];

  currentSlideIndex: number = 0;
  
  constructor() {}

  ngOnInit(): void {}

 

  prevSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex > 0) ? this.currentSlideIndex - 1 : this.slides.length - 1;
  }

  nextSlide(): void {
    console.log(this.currentSlideIndex);
    this.currentSlideIndex = (this.currentSlideIndex < this.slides.length - 1) ? this.currentSlideIndex + 1 : 0;
  }

}

