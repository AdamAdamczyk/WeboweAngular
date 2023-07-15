import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-functionality-detail',
  templateUrl: './functionality-detail.component.html',
  styleUrls: ['./functionality-detail.component.scss']
})
export class FunctionalityDetailComponent implements OnInit {
  functionalityId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.functionalityId = this.route.snapshot.paramMap.get('id');
    // Możesz wykorzystać functionalityId do pobrania szczegółowych informacji o funkcjonalności
    // i przypisania zadań związanych z tą funkcjonalnością
  }

  goBack(): void {
    this.router.navigate(['/']); // Powróć na stronę główną
  }
}
